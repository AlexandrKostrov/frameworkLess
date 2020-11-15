import { ConnectionOptions } from 'typeorm';
import { ConfigService } from './config/config.service';

const configService = new ConfigService(`${process.env.NODE_ENV || 'development'}.env`);
const config: ConnectionOptions = {
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: Number(configService.get('DB_PORT')),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASS'),
  database: configService.get('DB_NAME'),
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  logger: 'file',
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = config;
