import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from 'src/book/book.repository';
import { EmailService } from 'src/email/email.service';
import { UserRepository } from 'src/user/user.repository';
import { ReminderService } from './Reminder.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, BookRepository])],
  controllers: [],
  providers: [ReminderService, EmailService],
})
export class ReminderModule {}
