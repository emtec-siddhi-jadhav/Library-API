import {
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as moment from 'moment';
import { UserEntity } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { BookStatus } from './book.status.enum';
import { BookUserEntity } from '../BookUserBook/book.user.entity';
import { CreateBookDTO } from './dto/create.book.dto';
import { issuedBookDTO } from './dto/issued.book.dto';
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
    book.quantity = createBookDto.quantity;
    console.log(book);
    return this.save(book);
  }

  async bookQuantity(quantity: number) {
    if (quantity == 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          message: 'Book is not available',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    } else {
      return quantity - 1;
    }
  }

  async issuedBook(issuedBookDto: issuedBookDTO, id: number) {
    const book = await this.findOne(id, { relations: ['user'] });
    if (!book) {
      throw new NotFoundException('book not found');
    }
    if (
      book.status == BookStatus.Issued /*&&
      BookUserEntity.userId == issuedBookDto.id*/
    ) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          message: 'Book is already issued',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    book.status = BookStatus.Issued;
    book.quantity = await this.bookQuantity(book.quantity);
    //BookUserEntity.userId = issuedBookDto.id;
    //BookUserEntity.issuedDate = moment().toISOString();
    //BookUserEntity.returnDate = moment().add(7, 'days').toISOString();
    return this.save(book);
  }

  async returnBook(user: UserEntity, status: BookStatus, id: number) {
    const book = await this.findOne(id);
    if (!book) {
      throw new NotFoundException('book not found');
    }
    if (user.userId == 1) {
      if (book.status == BookStatus.Issued) {
        book.status = status;
        book.quantity = book.quantity + 1;
        //BookUserEntity.issuedDate = null;
        //BookUserEntity.returnDate = null;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_ACCEPTABLE,
            message: 'Book is not issued to anyone',
          },
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      return this.save(book);
    } else {
      throw new UnauthorizedException('Only admin can return the book');
    }
  }
}
