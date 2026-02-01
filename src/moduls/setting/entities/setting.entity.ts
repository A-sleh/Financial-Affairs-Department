import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Setting {
  @PrimaryGeneratedColumn()
  setting_id: number;

  @Column({ type: 'float', default: 0 })
  amper_price: number;

  @Column({ type: 'float', default: 0 })
  counter_price: number;
}
