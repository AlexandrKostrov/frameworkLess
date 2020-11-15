
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import CatalogTypeEntity from './catalog_type.entity';
// eslint-disable-next-line import/no-cycle

@Entity('catalog')
export default class CatalogEntity {
  @PrimaryColumn()
  catalog_id: number;

  @Column('varchar')
  value: string;

  @Column('varchar')
  description: string;

  @Column('int')
  catalog_type_id: number;

  @Column('timestamp')
  created_on: string;

  @Column('varchar')
  created_by: string;

  @Column('timestamp')
  modified_on: string;

  @Column('varchar')
  modified_by: string;

  @ManyToOne(() => CatalogTypeEntity, catalog_type => catalog_type.catalog, { lazy: true })
  @JoinColumn({ name: 'catalog_type_id', referencedColumnName: 'catalog_type_id' })
  catalog_type: CatalogTypeEntity;
}
