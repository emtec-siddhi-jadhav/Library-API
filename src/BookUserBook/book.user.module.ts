import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { BookUserController } from './book.user.controller';
import { BookUserRepository } from './book.user.repository';
import { BookUserService } from './book.user.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookUserRepository]), UserModule],
  controllers: [BookUserController],
  providers: [BookUserService],
})
export class BookModule {}
