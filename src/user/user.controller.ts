import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { SearchUserDTO } from './dto/search.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';
import { GetUser } from './get.user.decorators';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredentialsDTO: AuthCredentialsDTO): Promise<UserEntity> {
    return this.userService.signUp(authCredentialsDTO);
  }

  @Get('/signin')
  @UsePipes(ValidationPipe)
  signIn(@Body() authCredentialsDTO: AuthCredentialsDTO): Promise<{
    token: string;
  }> {
    return this.userService.signIn(authCredentialsDTO);
  }

  @Get('/profile')
  @UseGuards(AuthGuard())
  getProfile(@GetUser() user: UserEntity): UserEntity {
    return user;
  }

  @Get()
  getUsers(
    @GetUser() user: UserEntity,
    @Query() searchUserDto: SearchUserDTO,
  ): Promise<UserEntity[]> {
    return this.userService.getUsers(searchUserDto);
  }

  @Put('/:id')
  updateUser(
    @GetUser() user: UserEntity,
    @Body() updateUserDto: UpdateUserDTO,
    @Param('id') id: number,
  ): Promise<UpdateResult> {
    console.log(updateUserDto);
    return this.userService.updateUser(updateUserDto, id);
  }

  @Delete('/:id')
  deleteUser(
    @GetUser() user: UserEntity,
    @Param('id') id: number,
  ): Promise<DeleteResult> {
    return this.userService.deleteUser(id);
  }
}
