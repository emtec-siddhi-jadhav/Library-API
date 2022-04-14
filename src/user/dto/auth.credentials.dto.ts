import { IsNotEmpty, MinLength } from 'class-validator';

export class AuthCredentialsDTO {
  @IsNotEmpty()
  @MinLength(5)
  username: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
