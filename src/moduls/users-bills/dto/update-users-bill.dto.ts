import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersBillDto } from './create-users-bill.dto';

export class UpdateUsersBillDto extends PartialType(CreateUsersBillDto) {}
