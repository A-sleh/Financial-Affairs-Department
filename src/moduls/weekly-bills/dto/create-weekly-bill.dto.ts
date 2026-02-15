import { IsDate, IsNumber } from 'class-validator';
export class CreateWeeklyBillDto {
  @IsDate()
  data: Date;
  @IsNumber()
  amper_price: number;
  @IsNumber()
  counter_price: number;
}
