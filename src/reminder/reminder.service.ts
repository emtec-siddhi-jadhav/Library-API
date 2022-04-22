import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BookUserRepository } from '../BookUserBook/bookuser.repository';
import { getCustomRepository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { BookRepository } from '../book/book.repository';
import { BookEntity } from '../book/book.entity';
import { UserEntity } from '../user/user.entity';
interface EmailData {
  book: BookEntity;
  user: UserEntity;
}
@Injectable()
export class ReminderService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
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
      //console.log(user);
      const book = await this.bookRepository.findOne({
        where: { bookId: record.bookId },
      });
      return {
        user,
        book,
      };
    });
    console.log(
      `there are ${data.length} users who will receive mail for returning the book`,
    );
    await data.map(async (record) => {
      await this.sendEmail(record);
    });
  }

  async sendEmail(data: Promise<EmailData>) {
    const record = await data;
    //console.log(record);
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'dudley.treutel56@ethereal.email',
        pass: 'fasqUbrxpY1n7EkqD4',
      },
    });
    try {
      const info = await transporter.sendMail({
        from: 'dudley.treutel56@ethereal.email',
        to: record.user.email,
        subject: 'Reminder for returning the book',
        text: 'Hello Reader',
        html: `<p>Hello ${record.user.username}, you have following book to be returned </p><br>
        <b>book - ${record.book.title}</b>`,
      });
      console.log('Message sent: %s', info.messageId);
    } catch (err) {
      console.log(err.message);
    }
  }
}
