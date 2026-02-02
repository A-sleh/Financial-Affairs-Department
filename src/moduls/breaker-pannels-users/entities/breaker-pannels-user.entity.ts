import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BreakerPannel } from '@/moduls/breaker-pannel/entities/breaker-pannel.entity';
import { User } from '@/moduls/user/entities/user.entity';

export enum Subscription_type {
  counter = 'counter',
  breaker = 'breaker',
}

@Entity()
export class BreakerPannelsUser {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'users' })
  @ManyToOne(() => User)
  users: User;

  @JoinColumn({ name: 'breaker_pannels' })
  @ManyToOne(() => BreakerPannel)
  breaker_pannels: BreakerPannel;

  @Column({
    type: 'enum',
    enum: Subscription_type,
    default: Subscription_type.breaker,
  })
  subscribe_type: Subscription_type;

  @Column('varchar', { length: 255 })
  quantity: string;

  
  @Column('int', { nullable: true })
  counter_intial_value: number | null;
}
