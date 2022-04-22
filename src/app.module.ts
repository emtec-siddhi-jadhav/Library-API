import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { BookUserEntity } from './BookUserBook/book.user.entity';
import { TypeOrmConfiguration } from './config/typeorm.config';
import { EmailModule } from './email/email.module';
import { ReminderModule } from './reminder/reminder.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    BookModule,
    UserModule,
    ReminderModule,
    BookUserEntity,
    EmailModule,
    TypeOrmModule.forRoot(TypeOrmConfiguration),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
