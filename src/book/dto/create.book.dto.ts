import { IsNotEmpty } from 'class-validator';
export class CreateBookDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  category: string;
}
