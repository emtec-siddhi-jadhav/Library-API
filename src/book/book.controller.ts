import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get.user.decorators';
import { UserEntity } from 'src/user/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { BookEntity } from './book.entity';
import { BookStatus } from './book.status.enum';
import { BookService } from './book.service';
import { CreateBookDTO } from './dto/create.book.dto';
import { SearchBookDTO } from './dto/search.book.dto';
import { UpdateBookDTO } from './dto/update.book.dto';

@Controller('book')
@UseGuards(AuthGuard())
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBook(@Body() createBookDto: CreateBookDTO): Promise<BookEntity> {
    return this.bookService.createBook(createBookDto);
  }

  @Get()
  getBooks(
    @GetUser() user: UserEntity,
    @Query() searchBookDto: SearchBookDTO,
  ): Promise<BookEntity[]> {
    return this.bookService.getBooks(searchBookDto);
  }

  @Put('/:id')
  updateBook(
    @GetUser() user: UserEntity,
    @Body() updateBookDto: UpdateBookDTO,
    @Param('id') id: number,
  ): Promise<UpdateResult> {
    return this.bookService.updateBook(updateBookDto, id);
  }

  @Patch('/:id/:status')
  updateBookStatus(
    @GetUser() user: UserEntity,
    @Param('id') id: string,
    @Param('status') status: BookStatus,
  ): Promise<BookEntity> {
    return this.bookService.updateBookStatus(id, status);
  }

  @Delete('/:id')
  deleteBook(
    @GetUser() user: UserEntity,
    @Param('id') id: number,
  ): Promise<DeleteResult> {
    return this.bookService.deleteBook(id);
  }
}
