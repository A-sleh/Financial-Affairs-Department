import { BreakerPannelsUser } from '@/moduls/breaker-pannels-users/entities/breaker-pannels-user.entity';
import { WeeklyBill } from '@/moduls/weekly-bills/entities/weekly-bill.entity';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class UsersBill {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BreakerPannelsUser)
  @JoinColumn({ name: 'user' })
  user: BreakerPannelsUser;

  @ManyToOne(() => WeeklyBill)
  @JoinColumn({ name: 'weekly_bill' })
  weekly_bill: WeeklyBill;

  @Column({ type: 'date', nullable: true })
  payed_date: Date | null;

  @Column({ type: 'float', nullable: true })
  total_required_price: number | null;

  @Column({ type: 'float' })
  payed_amount: number;

  @Column({ type: 'float', nullable: true })
  counter_value: number | null;

  @Column({ type: 'float', nullable: true })
  last_counter_value: number | null;
}
