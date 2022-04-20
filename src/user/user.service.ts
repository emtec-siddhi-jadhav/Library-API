import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchUserDTO } from './dto/search.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';
import { JwtPayload } from './jwt.payload';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthCredentialsSignUpDTO } from './dto/auth.credentials.signup.dto';
import { AuthCredentialsSignInDTO } from './dto/auth.credentials.signin.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsSignUpDTO: AuthCredentialsSignUpDTO) {
    return this.userRepository.signUp(authCredentialsSignUpDTO);
  }

  async signIn(authCredentialsSignInDTO: AuthCredentialsSignInDTO) {
    const user = await this.userRepository.signIn(authCredentialsSignInDTO);
    if (!user) {
      throw new UnauthorizedException('user is not authorized');
    } else {
      const payload: JwtPayload = {
        email: user.email,
        userId: user.userId,
      };
      const token = this.jwtService.sign(payload);
      return { token };
    }
  }

  async getUsers(searchUserDto: SearchUserDTO): Promise<UserEntity[]> {
    return this.userRepository.getUsers(searchUserDto);
  }

  async updateUser(updateUserDto: UpdateUserDTO, id: number) {
    return this.userRepository.updateUser(updateUserDto, id);
  }

  async deleteUser(id: number) {
    const result = await this.userRepository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException('user not found');
    }
    throw new HttpException(
      {
        status: HttpStatus.OK,
        message: 'User is deleted',
      },
      HttpStatus.OK,
    );
  }

  async sendEmail() {
    return this.userRepository.sendEmail();
  }
}
