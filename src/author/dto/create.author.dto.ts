import { IsNotEmpty } from 'class-validator';
export class CreateAuthorDTO {
  @IsNotEmpty()
  author_name: string;

  @IsNotEmpty()
  email: string;
}
