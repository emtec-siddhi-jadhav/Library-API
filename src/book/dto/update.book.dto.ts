import { IsNotEmpty, IsOptional } from 'class-validator';
import { BookCategory } from '../book.category.enum';
//import { AuthorEntity } from 'src/author/author.entity';

export class UpdateBookDTO {
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsNotEmpty()
  @IsOptional()
  author: string;

  @IsNotEmpty()
  @IsOptional()
  category: BookCategory;
}
