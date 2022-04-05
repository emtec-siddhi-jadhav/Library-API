import { IsNotEmpty } from 'class-validator';
import { BookCategory } from '../book.category.enum';
//import { AuthorEntity } from 'src/author/author.entity';
export class CreateBookDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  category: string;
}
