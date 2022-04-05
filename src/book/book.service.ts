import { HttpCode, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { AuthorEntity } from 'src/author/author.entity';
//import { UserEntity } from 'src/user/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { BookEntity } from './book.entity';
import { BookStatus } from './book.status.enum';
import { BookRepository } from './book.repository';
import { CreateBookDTO } from './dto/create.book.dto';
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
    //const author = new AuthorEntity(createBookDto.author);
    //createBookDto.author = author;
    return this.bookRepository.createBook(createBookDto);
  }

  //updating a book
  async updateBook(
    updateBookDto: UpdateBookDTO,
    id: number,
  ): Promise<UpdateResult> {
    const updateData = {
      title: updateBookDto.title,
      author: updateBookDto.author,
      category: updateBookDto.category,
    };
    return this.bookRepository.update(id, updateData);
  }

  async updateBookStatus(id: string, status: BookStatus): Promise<BookEntity> {
    const book = await this.bookRepository.findOne(id);
    book.status = status;
    await book.save();
    return book;
  }

  async deleteBook(id: number): Promise<DeleteResult> {
    const result = await this.bookRepository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException('book not found');
    }
    return result;
  }
}
