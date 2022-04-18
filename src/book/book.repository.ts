import {
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { CreateBookDTO } from './dto/create.book.dto';
import { IssuedBookDTO } from './dto/issued.book.dto';
import { SearchBookDTO } from './dto/search.book.dto';
import { BookUserRepository } from 'src/BookUserBook/bookuser.repository';

@EntityRepository(BookEntity)
export class BookRepository extends Repository<BookEntity> {
  async getBooks(searchBookDto: SearchBookDTO): Promise<BookEntity[]> {
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

  async createBook(createBookDto: CreateBookDTO): Promise<BookEntity> {
    const book = new BookEntity();
    book.title = createBookDto.title;
    book.author = createBookDto.author;
    book.category = createBookDto.category;
    book.quantity = createBookDto.quantity;
    console.log(book);
    return this.save(book);
  }

  validateBookQuantity(quantity: number) {
    if (quantity == 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          message: 'Book is out of stock',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    return;
  }

  async issuedBook(issuedBookDto: IssuedBookDTO, id: number) {
    const book = await this.findOne(id);
    if (!book) {
      throw new NotFoundException('book not found');
    }
    this.validateBookQuantity(book.quantity);
    const bookUserRepository = getCustomRepository(BookUserRepository);
    const bookuser = await bookUserRepository.issuedBook(issuedBookDto, id);
    book.quantity = book.quantity - 1;
    await this.save(book);
    return bookUserRepository.save(bookuser);
  }

  async returnBook(issuedBookDto: IssuedBookDTO, user: UserEntity, id: number) {
    const book = await this.findOne(id);
    if (!book) {
      throw new NotFoundException('book not found');
    }
    if (user.userId == 1) {
      const bookUserRepository = getCustomRepository(BookUserRepository);
      const bookuser = await bookUserRepository.returnBook(issuedBookDto, id);
      if (bookuser != null) {
        book.quantity = book.quantity + 1;
      }
      return this.save(book);
    } else {
      throw new UnauthorizedException('Only admin can return the book');
    }
  }
}
