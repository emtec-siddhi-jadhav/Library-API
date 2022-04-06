//import { AuthorEntity } from 'src/author/author.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookCategory } from './book.category.enum';
import { BookStatus } from './book.status.enum';

@Entity('Book')
export class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  category: BookCategory;

  @Column()
  status: BookStatus;

  @ManyToOne((type) => UserEntity, (user) => user.books, {
    eager: false,
  })
  @JoinTable({})
  user: UserEntity;

  /*@ManyToOne((type) => AuthorEntity, (authors) => authors.books, {
    eager: false,
  })
  authors: AuthorEntity;*/
}
