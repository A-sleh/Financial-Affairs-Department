import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSettingDto {
  @IsNumber()
  @IsNotEmpty()
  amper_price: number;

  @IsNotEmpty()
  @IsNumber()
  counter_price: number;
}
