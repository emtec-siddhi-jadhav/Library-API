import { UserEntity } from 'src/user/user.entity';
///import { AuthorEntity } from 'src/Author/author.entity';

import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookStatus } from './book.enum';

@Entity('Book')
export class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  category: string;

  @Column()
  status: BookStatus;

  @ManyToOne((type) => UserEntity, (user) => user.books, { eager: false })
  user: UserEntity;

  /*@ManyToOne((type) => AuthorEntity, (authors) => authors.books, {
    eager: false,
  })
  authors: AuthorEntity;*/

  @Column()
  userId: number;
}