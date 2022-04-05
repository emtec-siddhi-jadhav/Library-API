import { UserEntity } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { AuthorEntity } from './author.entity';
import { CreateAuthorDTO } from './dto/create.author.dto';
import { SearchAuthorDTO } from './dto/search.author.dto';

@EntityRepository(AuthorEntity)
export class AuthorRepository extends Repository<AuthorEntity> {
  async getAuthors(searchAuthorDto: SearchAuthorDTO): Promise<AuthorEntity[]> {
    const { search } = searchAuthorDto;

    const query = this.createQueryBuilder('author');
    if (search) {
      query.andWhere(
        `(author.name LIKE :search) OR (author.email LIKE :search)`,
        { search: `%${search}%` },
      );
    }
    return await query.getMany();
  }

  async createAuthor(createAuthorDto: CreateAuthorDTO): Promise<AuthorEntity> {
    const author = new AuthorEntity();
    author.author_name = createAuthorDto.author_name;
    author.email = createAuthorDto.email;
    console.log(author);
    await author.save();
    return author;
  }
}
