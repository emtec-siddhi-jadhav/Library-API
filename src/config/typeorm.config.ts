import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const TypeOrmConfiguration: TypeOrmModuleOptions = {
  username: process.env.USERNAME_KEY,
  password: process.env.PASSWORD_KEY,
  port: 1433,
  host: process.env.HOST_KEY,
  type: 'mssql',
  database: 'library2',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: false,
  extra: {
    trustServerCertificate: true,
  },
};
