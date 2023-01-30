import { HttpException, HttpStatus } from '@nestjs/common';
import * as moment from 'moment';
import { IssuedBookDTO } from '../book/dto/issued.book.dto';
import { ReturnBookDTO } from '../book/dto/return.book.dto';
import { EntityRepository, Repository } from 'typeorm';
import { BookUserEntity } from './book.user.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

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
      returnDate: moment().add(7, 'days').format('L'),
    });
    return this.save(bookuser);
  }

  async checkIssuedBookWithUser(bookId: number, userId: number) {
    const bookuser = await this.find({ where: { bookId, userId } });
    if (bookuser.length != 0) {
      return bookuser[0];
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: `Book with id ${bookId} not issued to user ${userId}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async returnBook(returnBookDto: ReturnBookDTO) {
    const result = await this.checkIssuedBookWithUser(
      returnBookDto.bookId,
      returnBookDto.userId,
    );
    if (result) {
      await this.softDelete(result);
    }
  }

  async mailReceivers() {
    const tomorrow = moment().add(1, 'day').format('L');
    const query = this.createQueryBuilder('bookuser');
    query
      .select(['bookuser.bookId', 'bookuser.userId'])
      .where('bookuser.returnDate= :tomorrow', { tomorrow: `${tomorrow}` })
      .execute();
    const users = await query.getMany();
    return users;
  }
}
