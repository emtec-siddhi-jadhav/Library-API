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
import { AuthorEntity } from './author.entity';
import { AuthorService } from './author.service';
import { CreateAuthorDTO } from './dto/create.author.dto';
import { SearchAuthorDTO } from './dto/search.author.dto';

@Controller('author')
@UseGuards(AuthGuard())
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createAuthor(
    @GetUser() user: UserEntity,
    @Body() createAuthorDto: CreateAuthorDTO,
  ): Promise<AuthorEntity> {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Get()
  getAuthors(
    @GetUser() user: UserEntity,
    @Query() searchAuthorDto: SearchAuthorDTO,
  ): Promise<AuthorEntity[]> {
    return this.authorService.getAuthors(searchAuthorDto);
  }
}
