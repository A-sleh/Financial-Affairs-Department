// Entities
import { Setting } from '@/moduls/setting/entities/setting.entity';
import { User } from '@/moduls/user/entities/user.entity';
import { WeeklyBill } from '@/moduls/weekly-bills/entities/weekly-bill.entity';
import { BreakerPannelsUser } from '@/moduls/breaker-pannels-users/entities/breaker-pannels-user.entity';
import { UsersBill } from '@/moduls/users-bills/entities/users-bill.entity';
import { BreakerPannel } from '@/moduls/breaker-pannel/entities/breaker-pannel.entity';

// Modules
import { Module } from '@nestjs/common';
import { ConfigifyModule } from '@itgorillaz/configify';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingModule } from '@/moduls/setting/setting.module';
import { BreakerPannelModule } from '@/moduls/breaker-pannel/breaker-pannel.module';
import { UserModule } from './moduls/user/user.module';
import { WeeklyBillsModule } from './moduls/weekly-bills/weekly-bills.module';
import { UsersBillsModule } from './moduls/users-bills/users-bills.module';
import { BreakerPannelsUsersModule } from './moduls/breaker-pannels-users/breaker-pannels-users.module';

@Module({
  imports: [
    ConfigifyModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      username: 'fast_database',
      password: '0956411461',
      database: 'financial-affairs-department',
      autoLoadEntities: true,
      entities: [
        Setting,
        User,
        WeeklyBill,
        BreakerPannelsUser,
        UsersBill,
        BreakerPannel,
      ],
      synchronize: true,
    }),
    UserModule,
    WeeklyBillsModule,
    UsersBillsModule,
    BreakerPannelsUsersModule,
    SettingModule,
    BreakerPannelModule,
  ],
})
export class AppModule {}
