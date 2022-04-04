import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

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
