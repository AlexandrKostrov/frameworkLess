import { Column, Entity, PrimaryColumn } from 'typeorm';

export interface BaseState {
  state_id: string;
  state_name: string;
}

@Entity('state')
export default class StateEntity implements BaseState {
  @PrimaryColumn()
  state_id: string;

  @Column({ nullable: true })
  state_name: string;
}
