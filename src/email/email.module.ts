import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from '../book/book.repository';
import { UserRepository } from '../user/user.repository';
import { EmailService } from '../email/email.service';
import { ReminderModule } from 'src/reminder/reminder.module';

@Module({
  imports: [ReminderModule],
  controllers: [],
  providers: [EmailService],
})
export class EmailModule {}
