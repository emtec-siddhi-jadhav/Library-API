import { BookEntity } from 'src/book/book.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Author')
export class AuthorEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author_name: string;

  @Column()
  email: string;

  @OneToMany((type) => BookEntity, (book) => book.author, { eager: true })
  books: BookEntity[];
}
