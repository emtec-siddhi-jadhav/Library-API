import { BookEntity } from '../book/book.entity';
import { UserEntity } from '../user/user.entity';

import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('BookUser')
export class BookUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookId: number;

  @Column()
  userId: number;

  @Column()
  issuedDate: string;

  @Column()
  returnDate: string;

  @ManyToOne(() => BookEntity, (book) => book.bookUsers)
  @JoinColumn({ name: 'bookId' })
  book: BookEntity;

  @ManyToOne(() => UserEntity, (user) => user.bookUsers)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @DeleteDateColumn()
  deletedAt: Date;
}
