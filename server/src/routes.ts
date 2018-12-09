import { Routes } from 'nest-router';
import { routes as wordRoutes } from './word/routes';

export const routes: Routes = [
	{
		path: '/word',
		children: wordRoutes,
	},
];
