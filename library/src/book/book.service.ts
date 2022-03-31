import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { BookEntity } from './book.entity';
import { BookRepository } from './book.repository';
import { CreateBookDTO } from './dto/create.book.dto';
import { SearchBookDTO } from './dto/search.book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
  ) {}

  //return all books
  GetBooks(searchBookDto: SearchBookDTO): Promise<BookEntity[]> {
    return this.bookRepository.GetBooks(searchBookDto);
  }

  //creating a new book
  CreateBook(
    createBookDto: CreateBookDTO,
    user: UserEntity,
  ): Promise<BookEntity> {
    return this.bookRepository.CreateBook(createBookDto, user);
  }
}
