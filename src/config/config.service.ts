// import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

type ConfigVars =
  | 'DB_HOST'
  | 'DB_USER'
  | 'DB_PASS'
  | 'DB_NAME'
  | 'DB_PORT'
  | 'TOKEN_SECRET'
  | 'PORT'
  | 'SENTRY_DSN'
  | 'APP_HOST'
  | 'APP_PORT'
  | 'AWS_API_VER'
  | 'AWS_REGION'
  | 'SES_KEY'
  | 'SES_SECRET_ACCESS_KEY'
  | 'SES_FROM'
  | 'GOOGLE_MAPS_API_KEY'
  | 'NODE_ENV'
  ;

// @Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: ConfigVars): string {
    return this.envConfig[key] || process.env[key];
  }
}
