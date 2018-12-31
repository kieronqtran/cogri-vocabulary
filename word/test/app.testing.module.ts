import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: async (): Promise<TypeOrmModuleOptions> => {
				// @ts-ignore
				const database = global.__SQLJS__;
				return {
					type: 'sqljs',
					database,
					entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
				};
			},
		}),
	],
})
export class AppTestingModule {}
