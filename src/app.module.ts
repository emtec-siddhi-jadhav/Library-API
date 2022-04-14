import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { BookUserEntity } from './BookUserBook/book.user.entity';
import { TypeOrmConfiguration } from './config/typeorm.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    BookModule,
    UserModule,
    BookUserEntity,
    TypeOrmModule.forRoot(TypeOrmConfiguration),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
