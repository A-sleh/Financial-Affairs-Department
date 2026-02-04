import { Module } from '@nestjs/common';
import { BreakerPannelsUsersService } from './breaker-pannels-users.service';
import { BreakerPannelsUsersController } from './breaker-pannels-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreakerPannel } from '../breaker-pannel/entities/breaker-pannel.entity';
import { User } from '../user/entities/user.entity';
import { BreakerPannelsUser } from './entities/breaker-pannels-user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, BreakerPannel, BreakerPannelsUser])],
  controllers: [BreakerPannelsUsersController],
  providers: [BreakerPannelsUsersService],
})
export class BreakerPannelsUsersModule {}
