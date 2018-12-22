import { NgModule } from '@angular/core';
import { MatStepperModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { LearnPageComponent } from './containers/learn-page/learn-page.component';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '@app/shared';
import * as fromLearn from './reducers';
import { LearnEffects } from './effects/learn.effects';
import { LearnRoutingModule } from './learn-routing.module';
import { LearnService } from './services/learn.service';
import { LearnStepperComponent } from './components/learn-stepper/learn-stepper.component';

@NgModule({
  imports: [
    MatStepperModule,
    SharedModule,
    LearnRoutingModule,
    StoreModule.forFeature('learn', fromLearn.reducers),
    EffectsModule.forFeature([LearnEffects]),
  ],
  providers: [LearnService],
  declarations: [LearnPageComponent, LearnStepperComponent],
})
export class LearnModule {}
