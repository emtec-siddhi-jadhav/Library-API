import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BookUserRepository } from '../BookUserBook/bookuser.repository';
import { getCustomRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { BookRepository } from '../book/book.repository';
import { EmailService } from '../email/email.service';

@Injectable()
export class ReminderService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,

    private emailService: EmailService,
  ) {}

  @Cron('0 10 * * *')
  async run() {
    const bookUserRepository = getCustomRepository(BookUserRepository);
    const records = await bookUserRepository.mailReceivers();
    console.log(records);
    const data = await records.map(async (record) => {
      const user = await this.userRepository.findOne({
        where: { userId: record.userId },
      });
      const book = await this.bookRepository.findOne({
        where: { bookId: record.bookId },
      });
      return {
        user,
        book,
      };
    });
    console.log(
      `there are ${data.length} users who will receive reminder for returning the book`,
    );
    await data.map(async (record) => {
      await this.emailService.sendEmail(record);
    });
  }
}
