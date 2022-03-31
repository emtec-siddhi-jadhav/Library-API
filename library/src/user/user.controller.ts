import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { SearchUserDTO } from './dto/search.user.dto';
import { GetUser } from './get.user.decorators';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  SignUp(@Body() authCredentialsDTO: AuthCredentialsDTO) {
    return this.userService.SignUp(authCredentialsDTO);
  }

  @Get('/signin')
  @UsePipes(ValidationPipe)
  SignIn(@Body() authCredentialsDTO: AuthCredentialsDTO) {
    return this.userService.SignIn(authCredentialsDTO);
  }

  @Get('/profile')
  @UseGuards(AuthGuard())
  GetProfile(@GetUser() user: UserEntity) {
    return user;
  }

  @Get()
  GetUsers(
    @GetUser() user: UserEntity,
    @Query() searchUserDto: SearchUserDTO,
  ): Promise<UserEntity[]> {
    return this.userService.GetUsers(searchUserDto);
  }
}
