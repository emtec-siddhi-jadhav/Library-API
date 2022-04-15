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
import { BookEntity } from './book.entity';
import { BookService } from './book.service';
import { BookStatus } from './book.status.enum';
import { CreateBookDTO } from './dto/create.book.dto';
import { issuedBookDTO } from './dto/issued.book.dto';
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
  getBooks(@Query() searchBookDto: SearchBookDTO): Promise<BookEntity[]> {
    return this.bookService.getBooks(searchBookDto);
  }

  @Put('/:id')
  updateBook(@Body() updateBookDto: UpdateBookDTO, @Param('id') id: number) {
    return this.bookService.updateBook(updateBookDto, id);
  }

  @Patch('/:id')
  issuedBook(
    @Param('id') id: number,
    @Body() issuedBookDto: issuedBookDTO,
  ): Promise<BookEntity> {
    return this.bookService.issuedBook(issuedBookDto, id);
  }

  @Patch('/:id/:status')
  returnBook(
    @Param('id') id: number,
    @Param('status') status: BookStatus,
    @GetUser() user: UserEntity,
  ): Promise<BookEntity> {
    return this.bookService.returnBook(id, user, status);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: number) {
    return this.bookService.deleteBook(id);
  }
}
