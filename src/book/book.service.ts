import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { BookEntity } from './book.entity';
import { BookRepository } from './book.repository';
import { BookStatus } from './book.status.enum';
import { CreateBookDTO } from './dto/create.book.dto';
import { issuedBookDTO } from './dto/issued.book.dto';
import { SearchBookDTO } from './dto/search.book.dto';
import { UpdateBookDTO } from './dto/update.book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
  ) {}

  //return all books
  async getBooks(searchBookDto: SearchBookDTO): Promise<BookEntity[]> {
    return this.bookRepository.getBooks(searchBookDto);
  }

  //creating a new book
  async createBook(createBookDto: CreateBookDTO): Promise<BookEntity> {
    return this.bookRepository.createBook(createBookDto);
  }

  //updating a book
  async updateBook(
    updateBookDto: UpdateBookDTO,
    id: number,
  ): Promise<UpdateBookDTO> {
    const updateData = {
      title: updateBookDto.title,
      author: updateBookDto.author,
      category: updateBookDto.category,
    };
    await this.bookRepository.update(id, updateData);
    return updateBookDto;
  }

  async issuedBook(
    issuedBookDto: issuedBookDTO,
    id: number,
  ): Promise<BookEntity> {
    return this.bookRepository.issuedBook(issuedBookDto, id);
  }

  async returnBook(
    id: number,
    user: UserEntity,
    status: BookStatus,
  ): Promise<BookEntity> {
    return this.bookRepository.returnBook(user, status, id);
  }

  async deleteBook(id: number) {
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
  }
}
