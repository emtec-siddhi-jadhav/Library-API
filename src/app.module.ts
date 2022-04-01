import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
//import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { TypeOrmConfiguration } from './config/typeorm.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    BookModule,
    UserModule,
    TypeOrmModule.forRoot(TypeOrmConfiguration),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
