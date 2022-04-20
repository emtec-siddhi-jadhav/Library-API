import { IsNotEmpty, MinLength } from 'class-validator';

export class AuthCredentialsSignInDTO {
  @IsNotEmpty()
  @MinLength(5)
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
