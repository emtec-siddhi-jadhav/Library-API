import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as crypto from 'crypto-js';
import { BookEntity } from 'src/book/book.entity';

@Entity('User')
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany((type) => BookEntity, (book) => book.user, { eager: true })
  books: BookEntity[];

  validatePassword(password: string) {
    const encrypted = `${crypto.MD5(password)}`;
    return encrypted == this.password;
  }
}
