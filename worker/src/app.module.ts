import { HttpModule, Module } from '@nestjs/common';
import { SubscriptionModule } from './subscription/subscription.module';
import { ConfigService } from './core';

@Module({
  imports: [
    SubscriptionModule.registerAsync({
      useClass: ConfigService,
    }),
    HttpModule,
  ],
  controllers: [],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(),
    }
  ],
})
export class AppModule {}
