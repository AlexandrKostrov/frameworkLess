import { Module } from '@nestjs/common';
import { createDbConnection } from 'connection';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { createConnection } from 'typeorm';
import CatalogEntity from './catalog.entity';
import CatalogTypeEntity from './catalog_type.entity';

const CATALOG_REPOSITORY = Symbol('CatalogRepository');

@Module({
  controllers: [CatalogController],
  providers: [
    {
      provide: CATALOG_REPOSITORY,
      useFactory: async () => {
        const connection = await createConnection(createDbConnection([CatalogEntity, CatalogTypeEntity]));
        return connection.getRepository(CatalogEntity);
      }
    },
    {
      provide: CatalogService,
      useFactory: async (catalogRepository) => {
        return new CatalogService(catalogRepository)
      },
      inject: [CATALOG_REPOSITORY]
    }
  ]
})
export class CatalogModule { }  
