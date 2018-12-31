import { HttpModule, Module } from '@nestjs/common';
import { routes } from './routes';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigService } from './core';
import { RouterModule } from 'nest-router';
import { JwtAuthGuard } from './components/guard/auth.guard';
import { LearnerModule } from './learner/learner.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    CoreModule,
    LearnerModule,
    HttpModule,
    RouterModule.forRoutes(routes),
  ],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(),
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
