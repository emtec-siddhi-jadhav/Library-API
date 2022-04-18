import { HttpException, HttpStatus } from '@nestjs/common';
import * as moment from 'moment';
import { IssuedBookDTO } from 'src/book/dto/issued.book.dto';
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

  async issuedBook(issuedBookDto: IssuedBookDTO, id: number) {
    await this.validateIssuedBookWithUser(issuedBookDto.id, id);
    const bookuser = this.create({
      userId: issuedBookDto.id,
      bookId: id,
      issuedDate: moment().toISOString(),
      returnDate: moment().add(7, 'days').toISOString(),
    });
    return this.save(bookuser);
  }

  async returnBook(issuedBookDto: IssuedBookDTO, id: number) {
    const bookuser = await this.findOne(id);
    if (bookuser.userId === issuedBookDto.id && bookuser.bookId === id) {
      this.delete(bookuser.id);
    }
    return this.save(bookuser);
  }
}
