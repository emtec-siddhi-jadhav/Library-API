import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookUserEntity } from 'src/BookUserBook/book.user.entity';
import { UserEntity } from 'src/user/user.entity';
import { BookEntity } from './book.entity';
import { BookRepository } from './book.repository';
import { CreateBookDTO } from './dto/create.book.dto';
import { IssuedBookDTO } from './dto/issued.book.dto';
import { ReturnBookDTO } from './dto/return.book.dto';
import { SearchBookDTO } from './dto/search.book.dto';
import { UpdateBookDTO } from './dto/update.book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
  ) {}

  async getBooks(searchBookDto: SearchBookDTO): Promise<BookEntity[]> {
    return this.bookRepository.getBooks(searchBookDto);
  }

  async createBook(
    user: UserEntity,
    createBookDto: CreateBookDTO,
  ): Promise<BookEntity> {
    return this.bookRepository.createBook(user, createBookDto);
  }

  async updateBook(
    user: UserEntity,
    updateBookDto: UpdateBookDTO,
    id: number,
  ): Promise<UpdateBookDTO> {
    return this.bookRepository.updateBook(user, updateBookDto, id);
  }

  async issuedBook(
    user: UserEntity,
    issuedBookDto: IssuedBookDTO,
  ): Promise<BookUserEntity> {
    return this.bookRepository.issuedBook(issuedBookDto);
  }

  async returnBook(returnBookDto: ReturnBookDTO, user: UserEntity) {
    return this.bookRepository.returnBook(returnBookDto, user);
  }

  async deleteBook(user: UserEntity, id: number) {
    if (user.userId == 1) {
      const result = await this.bookRepository.delete(id);
      if (result.affected == 0) {
        throw new NotFoundException('book not found');
      }
      throw new HttpException(
        {
          status: HttpStatus.OK,
          message: 'Book is deleted',
        },
        HttpStatus.OK,
      );
    } else {
      throw new UnauthorizedException('Only admin can delete the book');
    }
  }
}
