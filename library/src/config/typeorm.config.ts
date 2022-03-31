import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const TypeOrmConfiguration: TypeOrmModuleOptions = {
  username: process.env.USERNAME_KEY,
  password: process.env.PASSWORD_KEY,
  port: 3306,
  host: process.env.HOST_KEY,
  type: 'mysql',
  database: 'library',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: false,
};
