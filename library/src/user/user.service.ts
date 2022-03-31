import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { SearchUserDTO } from './dto/search.user.dto';
import { JwtPayload } from './jwt.payload';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async SignUp(authCredentialsDTO: AuthCredentialsDTO): Promise<UserEntity> {
    return this.userRepository.SignUp(authCredentialsDTO);
  }

  async SignIn(authCredentialsDTO: AuthCredentialsDTO) {
    const user = await this.userRepository.SignIn(authCredentialsDTO);
    if (!user) {
      throw new UnauthorizedException('user is not authorized');
    } else {
      //creating jwt token
      const payload: JwtPayload = {
        username: user.username,
        id: user.id,
      };
      const token = await this.jwtService.sign(payload);
      return { token };
    }
  }

  async GetUsers(searchUserDto: SearchUserDTO): Promise<UserEntity[]> {
    return this.userRepository.GetUsers(searchUserDto);
  }
}
