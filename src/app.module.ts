import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './auth.middleware';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { StateModule } from './state/state.module';
import { CatalogModule } from './catalog/catalog.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule as BasicConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
@Global()
@Module({
  imports: [
    BasicConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<MysqlConnectionOptions> => ({
        type: 'mysql',
        timezone: 'utc',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        synchronize: false,
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
        // logging: configService.get('NODE_ENV') !== 'production' ? ['query', 'error'] : undefined,
        migrationsRun: true,
        migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
        cli: {
          // Location of migration should be inside src folder
          // to be compiled into dist/ folder.
          migrationsDir: 'src/migrations',
        },
      }),
      inject: [ConfigService],
    }),
    StateModule,
    CatalogModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        '/v1/auth/users',
        '/v1/states',
        '/v1/catalog'
      )
      .forRoutes('*');
  }
}
