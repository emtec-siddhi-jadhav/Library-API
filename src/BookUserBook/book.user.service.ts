import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { BookStatus } from '../book/book.status.enum';
import { issuedBookDTO } from '../book/dto/issued.book.dto';
import { BookUserRepository } from './book.user.repository';

@Injectable()
export class BookUserService {
  constructor(
    @InjectRepository(BookUserRepository)
    private bookUserRepository: BookUserRepository,
  ) {}

  async issuedBook(issuedBookDto: issuedBookDTO, id: number) {
    return this.bookUserRepository.issuedBook(issuedBookDto, id);
  }

  async returnBook(id: number, user: UserEntity, status: BookStatus) {
    return this.bookUserRepository.returnBook(user, status, id);
  }
}
