import { Module } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { ReminderModule } from 'src/reminder/reminder.module';

@Module({
  imports: [ReminderModule],
  controllers: [],
  providers: [EmailService],
})
export class EmailModule {}
