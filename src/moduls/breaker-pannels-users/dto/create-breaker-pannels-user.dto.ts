import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Subscription_type } from '../entities/breaker-pannels-user.entity';
import { CreateUserDto as IUser } from '@/moduls/user/dto/create-user.dto';
export class CreateBreakerPannelsUserDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  breaker_pannel_id: number;

  @IsEnum(Subscription_type)
  subscribe_type: Subscription_type;

  @IsString()
  quantity: string;

  @IsInt()
  counter_intial_value: number | null;
}

export class BreakerPannelsInfo {
  breaker_pannel_id: number;
  location: string;
  max_breakers: number;
  users: IUser[];
}

export class PannelStatDto {
  breaker_pannel_id: number;
  location: string;
  total_users: number;
  total_ameper: number;
  total_counter_users: number;
  max_breakers: number;
}
