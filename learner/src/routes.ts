import { Routes } from 'nest-router';
import { LearnerModule } from './learner/learner.module';

export const routes: Routes = [
  {
    path: '/learner',
    module: LearnerModule,
  },
];
