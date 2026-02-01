import { PartialType } from '@nestjs/mapped-types';
import { CreateWeeklyBillDto } from './create-weekly-bill.dto';

export class UpdateWeeklyBillDto extends PartialType(CreateWeeklyBillDto) {}
