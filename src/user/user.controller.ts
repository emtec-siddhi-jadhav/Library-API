import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsSignInDTO } from './dto/auth.credentials.signin.dto';
import { AuthCredentialsSignUpDTO } from './dto/auth.credentials.signup.dto';
import { UpdateUserDTO } from './dto/update.user.dto';
import { GetUser } from './get.user.decorators';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredentialsSignUpDTO: AuthCredentialsSignUpDTO) {
    return this.userService.signUp(authCredentialsSignUpDTO);
  }

  @Get('/signin')
  @UsePipes(ValidationPipe)
  signIn(@Body() authCredentialsSignInDTO: AuthCredentialsSignInDTO): Promise<{
    token: string;
  }> {
    return this.userService.signIn(authCredentialsSignInDTO);
  }

  @Get('/profile')
  @UseGuards(AuthGuard())
  getProfile(@GetUser() user: UserEntity): UserEntity {
    return user;
  }

  @Get()
  @UseGuards(AuthGuard())
  getUsers(): Promise<UserEntity[]> {
    return this.userService.getUsers();
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  updateUser(@Body() updateUserDto: UpdateUserDTO, @Param('id') id: number) {
    console.log(updateUserDto);
    return this.userService.updateUser(updateUserDto, id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
