import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { SearchUserDTO } from './dto/search.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';
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

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<UserEntity> {
    return this.userRepository.signUp(authCredentialsDTO);
  }

  async signIn(authCredentialsDTO: AuthCredentialsDTO) {
    const user = await this.userRepository.signIn(authCredentialsDTO);
    if (!user) {
      throw new UnauthorizedException('user is not authorized');
    } else {
      //creating jwt token
      const payload: JwtPayload = {
        username: user.username,
        id: user.id,
      };
      const token = this.jwtService.sign(payload);
      return { token };
    }
  }

  async getUsers(searchUserDto: SearchUserDTO): Promise<UserEntity[]> {
    return this.userRepository.getUsers(searchUserDto);
  }

  async updateUser(
    updateUserDto: UpdateUserDTO,
    id: number,
  ): Promise<UpdateResult> {
    const updateUserData = {
      username: updateUserDto.username,
      password: updateUserDto.password,
    };
    return this.userRepository.update(id, updateUserData);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    const result = await this.userRepository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException('user not found');
    }
    return result;
  }
}
