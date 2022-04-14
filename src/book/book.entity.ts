import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookCategory } from './book.category.enum';
import { BookStatus } from './book.status.enum';
import { BookUserEntity } from '../BookUserBook/book.user.entity';

@Entity('Book')
export class BookEntity {
  @PrimaryGeneratedColumn()
  bookId: number;

  @Column('varchar')
  title: string;

  @Column('varchar')
  author: string;

  @Column('varchar')
  category: BookCategory;

  @Column('varchar')
  status: BookStatus;

  @OneToMany(() => BookUserEntity, (bookUser) => bookUser.book, {
    eager: false,
  })
  bookUsers: BookUserEntity[];

  @Column('int')
  quantity: number;
}
