import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { UserEntity } from './user.entity';
import * as crypto from 'crypto-js';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { SearchUserDTO } from './dto/search.user.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signUp(authCredentialsDTO: AuthCredentialsDTO) {
    const user = new UserEntity();
    user.username = authCredentialsDTO.username;
    user.password = `${crypto.MD5(authCredentialsDTO.password)}`;
    try {
      return await user.save();
    } catch {
      throw new BadRequestException('Duplicate entry');
    }
  }
  async signIn(authCredentialsDTO: AuthCredentialsDTO) {
    const { username, password } = authCredentialsDTO;
    const user = await this.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('user is not authorized');
    }
    if (!user.validatePassword(password)) {
      return null;
    }
    return user;
  }

  async getUsers(searchUserDto: SearchUserDTO): Promise<UserEntity[]> {
    const { search } = searchUserDto;
    const query = this.createQueryBuilder('user');
    if (search) {
      query.andWhere(`(user.id LIKE :search) OR (user.username LIKE :search)`, {
        search: `%${search}%`,
      });
    }
    return await query.getMany();
  }
}
