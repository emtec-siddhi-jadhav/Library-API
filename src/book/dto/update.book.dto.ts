import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { BookCategory } from '../book.category.enum';
//import { AuthorEntity } from 'src/author/author.entity';

export class UpdateBookDTO {
  @Exclude()
  id: number;

  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsNotEmpty()
  @IsOptional()
  author: string;

  @IsNotEmpty()
  @IsOptional()
  category: string;
}
