import { UserEntity } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { CreateBookDTO } from './dto/create.book.dto';
import { SearchBookDTO } from './dto/search.book.dto';

@EntityRepository(BookEntity)
export class BookRepository extends Repository<BookEntity> {
  async GetBooks(searchBookDto: SearchBookDTO): Promise<BookEntity[]> {
    const { search } = searchBookDto;

    const query = this.createQueryBuilder('book');
    if (search) {
      query.andWhere(
        `(book.title LIKE :search) OR (book.category LIKE :search) OR (book.author LIKE :search)`,
        { search: `%${search}%` },
      );
    }
    return await query.getMany();
  }

  async CreateBook(
    createBookDto: CreateBookDTO,
    user: UserEntity,
  ): Promise<BookEntity> {
    const book = new BookEntity();
    book.title = createBookDto.title;
    book.author = createBookDto.author;
    book.category = createBookDto.category;

    book.user = user;

    await book.save();
    delete book.user;
    return book;
  }
}
