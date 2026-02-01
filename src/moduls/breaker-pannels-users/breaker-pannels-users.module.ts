import { Module } from '@nestjs/common';
import { BreakerPannelsUsersService } from './breaker-pannels-users.service';
import { BreakerPannelsUsersController } from './breaker-pannels-users.controller';

@Module({
  controllers: [BreakerPannelsUsersController],
  providers: [BreakerPannelsUsersService],
})
export class BreakerPannelsUsersModule {}
