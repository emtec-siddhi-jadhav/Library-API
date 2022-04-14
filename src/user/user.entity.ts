import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as crypto from 'crypto-js';
import { BookUserEntity } from 'src/BookUserBook/book.user.entity';

@Entity('User')
@Unique(['username'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => BookUserEntity, (bookUser) => bookUser.user, { eager: true })
  bookUsers: BookUserEntity[];

  validatePassword(password: string) {
    const encrypted = `${crypto.MD5(password)}`;
    return encrypted == this.password;
  }
}
