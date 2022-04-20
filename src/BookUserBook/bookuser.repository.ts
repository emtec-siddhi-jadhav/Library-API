import { HttpException, HttpStatus } from '@nestjs/common';
import * as moment from 'moment';
import { IssuedBookDTO } from 'src/book/dto/issued.book.dto';
import { ReturnBookDTO } from 'src/book/dto/return.book.dto';
import { EntityRepository, Repository } from 'typeorm';
import { BookUserEntity } from './book.user.entity';

@EntityRepository(BookUserEntity)
export class BookUserRepository extends Repository<BookUserEntity> {
  async validateIssuedBookWithUser(userId: number, bookId: number) {
    const bookuser = await this.find({ where: { bookId, userId } });
    if (bookuser.length != 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          message: 'Book is already issued',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  async issuedBook(issuedBookDto: IssuedBookDTO) {
    await this.validateIssuedBookWithUser(
      issuedBookDto.userId,
      issuedBookDto.bookId,
    );
    const bookuser = this.create({
      userId: issuedBookDto.userId,
      bookId: issuedBookDto.bookId,
      issuedDate: moment().toISOString(),
      returnDate: moment().add(7, 'days').toISOString(),
    });
    return this.save(bookuser);
  }

  async checkIssuedBookWithUser(bookId: number, userId: number) {
    const bookuser = await this.find({ where: { bookId, userId } });
    if (bookuser.length != 0) {
      return bookuser[0];
    }
  }

  async returnBook(returnBookDto: ReturnBookDTO) {
    const result = await this.checkIssuedBookWithUser(
      returnBookDto.bookId,
      returnBookDto.userId,
    );
    if (result) {
      await this.softDelete(result);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          message: 'Book is already returned by the user',
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
}
