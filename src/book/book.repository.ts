import { EntityRepository, Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { BookStatus } from './book.status.enum';
import { CreateBookDTO } from './dto/create.book.dto';
import { SearchBookDTO } from './dto/search.book.dto';

@EntityRepository(BookEntity)
export class BookRepository extends Repository<BookEntity> {
  async getBooks(searchBookDto: SearchBookDTO): Promise<BookEntity[]> {
    const { search, status } = searchBookDto;

    const query = this.createQueryBuilder('book');
    if (status) {
      query.andWhere('book.status = :status', { status: status });
    }
    if (search) {
      query.andWhere(
        `(book.title LIKE :search) OR (book.category LIKE :search) OR (book.author LIKE :search)`,
        { search: `%${search}%` },
      );
    }
    return await query.getMany();
  }

  async createBook(createBookDto: CreateBookDTO): Promise<BookEntity> {
    const book = new BookEntity();
    book.title = createBookDto.title;
    book.author = createBookDto.author;
    book.category = createBookDto.category;
    book.status = BookStatus.Available;
    console.log(book);
    await book.save();
    return book;
  }
}
