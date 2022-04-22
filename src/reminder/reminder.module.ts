import { Module } from '@nestjs/common';
import { BookModule } from 'src/book/book.module';
import { UserModule } from 'src/user/user.module';
import { ReminderService } from './Reminder.service';

@Module({
  imports: [UserModule, BookModule],
  controllers: [],
  providers: [ReminderService],
})
export class ReminderModule {}
