import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { BookService } from './book.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository]), UserModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
