import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from '../book/book.repository';
import { EmailService } from '../email/email.service';
import { UserRepository } from '../user/user.repository';
import { ReminderService } from './Reminder.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, BookRepository])],
  controllers: [],
  providers: [ReminderService, EmailService],
})
export class ReminderModule {}
