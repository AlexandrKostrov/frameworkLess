import { Module } from '@nestjs/common';
import { createConnection, getRepository, EntityManager, Connection } from 'typeorm';
import { StateController } from './state.controller';
import StateEntity from './state.entity';
import { StateService } from './state.service';
import { createDbConnection } from 'connection';
import { TypeOrmModule } from '@nestjs/typeorm';

const STATE_REPOSITORY = Symbol('StateRepository');

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [StateController],
  providers: [
    {
      provide: STATE_REPOSITORY,
      useFactory: async () => {
        //ВАШ ВАРИАНТ
        // const connection = await createConnection(createDbConnection([StateEntity]));
        // return connection.getRepository(StateEntity);

        //МОЙ ВАРИАНТ
        const repository = getRepository(StateEntity)
        return repository;
      }
    },
    {
      provide: StateService,
      useFactory: async (stateRepository) => {
        return new StateService(stateRepository)
      },
      inject: [STATE_REPOSITORY]
    }
  ],
})
export class StateModule { }
