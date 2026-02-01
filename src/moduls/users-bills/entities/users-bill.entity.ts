import { User } from '@/moduls/user/entities/user.entity';
import { WeeklyBill } from '@/moduls/weekly-bills/entities/weekly-bill.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity()
export class UsersBill {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user" })
  user: User;

  @ManyToOne(() => WeeklyBill)
  @JoinColumn({ name: "weekly_bill" })
  weekly_bill: WeeklyBill;

  @Column({ type: 'date' })
  payed_date: Date;

  @Column({ type: 'float' })
  total_required_price: number;

  @Column({ type: 'float' })
  payed_amount: number;

  @Column({ type: 'float', nullable: true })
  counter_value: number | null;
}
