import { EntityRepository, Repository } from 'typeorm';
import * as crypto from 'crypto-js';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { SearchUserDTO } from './dto/search.user.dto';
import { UserEntity } from './user.entity';
import { AuthCredentialsSignUpDTO } from './dto/auth.credentials.signup.dto';
import { AuthCredentialsSignInDTO } from './dto/auth.credentials.signin.dto';
import { UpdateUserDTO } from './dto/update.user.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signUp(authCredentialsSignUpDTO: AuthCredentialsSignUpDTO) {
    const user = new UserEntity();
    user.email = authCredentialsSignUpDTO.email;
    user.username = authCredentialsSignUpDTO.username;
    user.password = `${crypto.MD5(authCredentialsSignUpDTO.password)}`;
    try {
      await this.save(user);
      delete user.password;
      return user;
    } catch (err) {
      throw new BadRequestException('user is already exist');
    }
  }
  async signIn(
    authCredentialsSignInDTO: AuthCredentialsSignInDTO,
  ): Promise<UserEntity> {
    const { email, password } = authCredentialsSignInDTO;
    const user = await this.findOne({ email });
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('user is not authorized');
    }
    if (!user.validatePassword(password)) {
      return null;
    }
    return user;
  }

  async getUsers(searchUserDto: SearchUserDTO): Promise<UserEntity[]> {
    const query = this.createQueryBuilder('user');
    /*if (search) {
      query.andWhere(`(user.id LIKE :search) OR (user.username LIKE :search)`, {
        search: `%${search}%`,
      });
    }*/
    query.select(['user.userId', 'user.email', 'user.username']).execute();
    return await query.getMany();
  }

  async updateUser(updateUserDto: UpdateUserDTO, id: number) {
    const user = await this.findOne(id);
    const OldData = {
      email: user.email,
      username: user.username,
      password: user.password,
    };
    const updateUserData = {
      email: updateUserDto.email,
      username: updateUserDto.username,
      password: `${crypto.MD5(updateUserDto.password)}`,
    };
    if (updateUserData.email == null) {
      updateUserData.email = OldData.email;
    }
    if (updateUserData.username == null) {
      updateUserData.username = OldData.username;
    }
    if (updateUserData.password == null) {
      updateUserData.password = OldData.password;
    }
    await this.update(id, updateUserData);
    if (updateUserData) {
      throw new HttpException(
        {
          message: 'User data is updated',
        },
        HttpStatus.OK,
      );
    }
  }

  async mails(userId: number[]) {
    const query = this.createQueryBuilder('user');
    query
      .select('user.email')
      .where('user.userId= :userId', { userId: { $in: userId } })
      .execute();
    const mails = await query.getMany();
    return mails;
  }
}
