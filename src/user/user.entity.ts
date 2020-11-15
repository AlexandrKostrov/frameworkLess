import {
  Entity, Column, PrimaryColumn,
  //  OneToOne, JoinColumn,
} from 'typeorm';
// import { AgentsPropertiesEntity } from '../agents-property/agents-property.entity';

@Entity('users')
export class UserEntity {
  @PrimaryColumn('varchar', { length: 255 })
  username: string;

  @Column({ type: 'int', unsigned: true, width: 10 })
  builder_id: number;

  @Column({ type: 'int', width: 11 })
  customer_id: number;

  @Column('varchar', { length: 255 })
  firstname: string;

  @Column('varchar', { length: 255 })
  lastname: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column('varchar', { length: 255 })
  phone: string;

  @Column('varchar', { length: 255 })
  pass_word: string;

  @Column('varchar', { length: 64 })
  pass_word_clone: string;

  @Column({ type: 'int', unsigned: true, width: 10 })
  level_id: number;

  @Column('varchar', { length: 255 })
  text_email: string;

  @Column({ type: 'int', width: 11 })
  sms_service: number;

  @Column({ type: 'tinyint', width: 4, default: 0 })
  send_sms: number;

  @Column({ type: 'tinyint', width: 4, default: 0 })
  send_email: number;
  // @OneToOne(
  //   () => AgentsPropertiesEntity,
  //   agent => agent.user,
  //   { lazy: true, nullable: true },
  // )
  // @JoinColumn({ name: 'username', referencedColumnName: 'agent_username' })
  // agent: AgentsPropertiesEntity;
}
