import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  password: string;

  @IsNotEmpty()
  @IsOptional()
  username: string;
}
