import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { BreakerPannelsUser } from '../breaker-pannels-users/entities/breaker-pannels-user.entity';
import { BreakerPannel } from '../breaker-pannel/entities/breaker-pannel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,BreakerPannelsUser,BreakerPannel])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
