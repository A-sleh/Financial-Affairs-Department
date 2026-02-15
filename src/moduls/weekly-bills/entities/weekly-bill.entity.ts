import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WeeklyBill {
  @PrimaryGeneratedColumn()
  weekly_bill_id: number;

  @Column('date')
  date: Date;

  @Column('float')
  amper_price: number;

  @Column('float')
  counter_price: number;
}
