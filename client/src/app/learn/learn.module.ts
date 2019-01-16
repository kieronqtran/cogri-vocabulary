import { NgModule } from '@angular/core';
import { MatStepperModule, MatGridListModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { LearnPageComponent } from './containers/learn-page/learn-page.component';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '@app/shared';
import * as fromLearn from './reducers';
import { LearnEffects } from './effects/learn.effects';
import { LearnRoutingModule } from './learn-routing.module';
import { LearnService } from './services/learn.service';
import { LearnStepperComponent } from './components/learn-stepper/learn-stepper.component';
import { MultipleChoiceQuizComponent } from './components/multiple-choice-quiz/multiple-choice-quiz.component';
import { DeckCardComponent } from './components/deck-card/deck-card.component';
import { LearnCardComponent } from './components/learn-card/learn-card.component';
import { ModePageComponent } from './containers/mode-page/mode-page.component';

@NgModule({
  imports: [
    MatGridListModule,
    MatStepperModule,
    SharedModule,
    LearnRoutingModule,
    StoreModule.forFeature('learn', fromLearn.reducers),
    EffectsModule.forFeature([LearnEffects]),
  ],
  providers: [LearnService],
  declarations: [
    LearnPageComponent,
    LearnStepperComponent,
    MultipleChoiceQuizComponent,
    DeckCardComponent,
    LearnCardComponent,
    ModePageComponent,
  ],
})
export class LearnModule {}
