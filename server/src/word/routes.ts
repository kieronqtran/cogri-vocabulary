import { Routes } from 'nest-router';
import { WordModule } from './v1/word.module';

export const routes: Routes = [
	{
		path: '/v1',
		module: WordModule,
	},
];
