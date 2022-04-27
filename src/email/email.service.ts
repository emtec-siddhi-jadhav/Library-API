import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { BookEntity } from '../book/book.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class EmailService {
  async sendEmail(data: Promise<{ user: UserEntity; book: BookEntity }>) {
    const record = await data;
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
        html: `<p>Hello ${record.user.username}, you have following book to be returned </p>
            <b>book - ${record.book.title}</b>`,
      });
      console.log('Message sent: %s', info.messageId);
    } catch (err) {
      console.log(err.message);
    }
  }
}
