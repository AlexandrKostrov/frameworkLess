
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import CatalogEntity from './catalog.entity';
// eslint-disable-next-line import/no-cycle

@Entity('catalog_type')
export default class CatalogTypeEntity {
  @PrimaryColumn()
  catalog_type_id: number;

  @Column('varchar')
  name: string;

  @OneToMany(() => CatalogEntity, catalog => catalog.catalog_type, { lazy: true })
  @JoinColumn({ name: 'catalog_type_id', referencedColumnName: 'catalog_type_id' })
  catalog: CatalogEntity[];
}
