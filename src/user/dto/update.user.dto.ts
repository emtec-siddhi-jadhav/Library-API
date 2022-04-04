import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDTO {
  @Exclude()
  id: number;

  @IsNotEmpty()
  @IsOptional()
  username: string;

  @IsNotEmpty()
  @IsOptional()
  password: string;
}
