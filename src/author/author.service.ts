import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { AuthorEntity } from './author.entity';
import { AuthorRepository } from './author.repository';
import { CreateAuthorDTO } from './dto/create.author.dto';
import { SearchAuthorDTO } from './dto/search.author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorRepository)
    private authorRepository: AuthorRepository,
  ) {}

  //return all Authors
  getAuthors(searchAuthorDto: SearchAuthorDTO): Promise<AuthorEntity[]> {
    return this.authorRepository.getAuthors(searchAuthorDto);
  }

  //creating a new Author
  createAuthor(createAuthorDto: CreateAuthorDTO): Promise<AuthorEntity> {
    return this.authorRepository.createAuthor(createAuthorDto);
  }
}
