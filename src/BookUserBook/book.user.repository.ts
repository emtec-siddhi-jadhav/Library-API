import {
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as moment from 'moment';
import { BookStatus } from 'src/book/book.status.enum';
import { issuedBookDTO } from 'src/book/dto/issued.book.dto';
import { UserEntity } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BookUserEntity } from './book.user.entity';

@EntityRepository(BookUserEntity)
export class BookUserRepository extends Repository<BookUserEntity> {
  async issuedBook(issuedBookDto: issuedBookDTO, id: number) {
    const book = await this.findOne(id, { relations: ['user'] });
    if (!book) {
      throw new NotFoundException('book not found');
    }
    if (BookUserEntity.userId == issuedBookDto.id) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          message: 'Book is already issued',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    } else {
      BookUserEntity.userId = issuedBookDto.id;
      BookUserEntity.issuedDate = moment().toISOString();
      BookUserEntity.returnDate = moment().add(7, 'days').toISOString();
      return this.save(book);
    }
  }

  async returnBook(user: UserEntity, status: BookStatus, id: number) {
    const book = await this.findOne(id);
    if (!book) {
      throw new NotFoundException('book not found');
    }
    if (user.userId == 1) {
      if (book.status == BookStatus.Issued) {
        BookUserEntity.issuedDate = null;
        BookUserEntity.returnDate = moment().toISOString();
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
