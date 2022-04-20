import { IsNotEmpty, MinLength } from 'class-validator';

export class AuthCredentialsSignUpDTO {
  @IsNotEmpty()
  @MinLength(5)
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsNotEmpty()
  @MinLength(5)
  username: string;
}
