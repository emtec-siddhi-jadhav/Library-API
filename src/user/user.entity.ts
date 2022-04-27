import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as crypto from 'crypto-js';
import { BookUserEntity } from '../BookUserBook/book.user.entity';

@Entity('User')
@Unique(['email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @OneToMany(() => BookUserEntity, (bookUser) => bookUser.user, { eager: true })
  bookUsers: BookUserEntity[];

  validatePassword(password: string) {
    const encrypted = `${crypto.MD5(password)}`;
    return encrypted == this.password;
  }
}
