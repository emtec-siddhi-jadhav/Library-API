import { IsNotEmpty } from 'class-validator';
//import { AuthorEntity } from 'src/Author/author.entity';
export class CreateBookDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  category: string;
}
