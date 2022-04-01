import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get.user.decorators';
import { UserEntity } from 'src/user/user.entity';
import { BookEntity } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDTO } from './dto/create.book.dto';
import { SearchBookDTO } from './dto/search.book.dto';

@Controller('book')
@UseGuards(AuthGuard())
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBook(
    @GetUser() user: UserEntity,
    @Body() createBookDto: CreateBookDTO,
  ): Promise<BookEntity> {
    return this.bookService.createBook(createBookDto, user);
  }

  @Get()
  getBooks(
    @GetUser() user: UserEntity,
    @Query() searchBookDto: SearchBookDTO,
  ): Promise<BookEntity[]> {
    return this.bookService.getBooks(searchBookDto);
  }
}
