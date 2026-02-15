import { BreakerPannelsUser } from '@/moduls/breaker-pannels-users/entities/breaker-pannels-user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BreakerPannel {
  @PrimaryGeneratedColumn()
  breaker_pannel_id: number;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @Column({ type: 'int' })
  max_breakers: number;

  @OneToMany(
    () => BreakerPannelsUser,
    (breakerPannelUsers) => breakerPannelUsers.breaker_pannel,
  )
  subscribers: BreakerPannelsUser[];
}
