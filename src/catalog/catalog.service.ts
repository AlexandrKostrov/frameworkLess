import { Repository } from 'typeorm';
import CatalogEntity from './catalog.entity';

export class CatalogService {
  constructor(private _repository: Repository<CatalogEntity>) {
  }

  getCatalog() {
    return this._repository.createQueryBuilder('catalog')
      .leftJoinAndSelect('catalog.catalog_type', 'catalog_type', 'catalog.catalog_type_id=catalog_type.catalog_type_id')
      .select(['catalog.value as value', 'catalog.catalog_id as catalog_id', 'catalog.catalog_type_id as catalog_type_id', 'catalog_type.name as name'])
      .orderBy('catalog.catalog_id', 'ASC')
      .getRawMany();
  }
}
