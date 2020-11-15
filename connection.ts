import { ConfigService } from "./src/config/config.service";
import { ConnectionOptions } from "typeorm";

const configService = new ConfigService(`${process.env.NODE_ENV}.env`);

export const createDbConnection = (entities): ConnectionOptions => {
  return {
    type: 'mysql',
    timezone: 'utc',
    host: configService.get('DB_HOST'),
    port: Number(configService.get('DB_PORT')),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASS'),
    database: configService.get('DB_NAME'),
    synchronize: false,
    entities: [...entities],
  }
}
