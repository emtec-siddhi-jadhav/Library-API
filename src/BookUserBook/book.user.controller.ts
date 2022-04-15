import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookStatus } from 'src/book/book.status.enum';
import { issuedBookDTO } from 'src/book/dto/issued.book.dto';
import { GetUser } from 'src/user/get.user.decorators';
import { UserEntity } from 'src/user/user.entity';
import { BookUserService } from './book.user.service';

@Controller('book')
@UseGuards(AuthGuard())
export class BookUserController {
  constructor(private bookUserService: BookUserService) {}

  @Patch('/:id')
  issuedBook(@Param('id') id: number, @Body() issuedBookDto: issuedBookDTO) {
    return this.bookUserService.issuedBook(issuedBookDto, id);
  }

  @Patch('/:id/:status')
  returnBook(
    @Param('id') id: number,
    @Param('status') status: BookStatus,
    @GetUser() user: UserEntity,
  ) {
    return this.bookUserService.returnBook(id, user, status);
  }
}
