import { IsNotEmpty, IsOptional } from 'class-validator';
import { BookCategory } from '../book.category.enum';

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

  @IsNotEmpty()
  @IsOptional()
  quantity: number;
}
