import { IsNotEmpty } from 'class-validator';
import { BookCategory } from '../book.category.enum';
export class CreateBookDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  category: BookCategory;

  @IsNotEmpty()
  quantity: number;
}
