import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BookUserRepository } from 'src/BookUserBook/bookuser.repository';
import { getCustomRepository } from 'typeorm';
import nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { BookRepository } from 'src/book/book.repository';
import { BookEntity } from 'src/book/book.entity';
import { UserEntity } from 'src/user/user.entity';
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

  @Cron('* * * * *')
  async run() {
    const bookUserRepository = getCustomRepository(BookUserRepository);
    const records = await bookUserRepository.mailReceivers();
    console.log(records);

    const data = await records.map(async (record) => {
      const user = await this.userRepository.findOne({
        where: { id: record.userId },
      });
      const book = await this.bookRepository.findOne({
        where: { id: record.bookId },
      });
      return {
        user,
        book,
      };
    });

    await data.map(async (record) => {
      await this.sendEmail(record);
    });
  }

  async sendEmail(data: Promise<EmailData>) {
    const record = await data;
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'dudley.treutel56@ethereal.email', // generated ethereal user
        pass: 'fasqUbrxpY1n7EkqD4', // generated ethereal password
      },
    });

    const info = await transporter.sendMail({
      from: 'dudley.treutel56@ethereal.email',
      to: record.user.email,
      subject: 'Reminder',
      text: 'Hello Reader',
      html: `<p>Hello Reader, you have following book to be returned 
      book - ${record.book.title}</p>`,
    });

    console.log('Message sent: %s', info.messageId);
  }
}
