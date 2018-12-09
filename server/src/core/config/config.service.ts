import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AuthOptionsFactory, IAuthModuleOptions } from '@nestjs/passport';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService implements TypeOrmOptionsFactory, AuthOptionsFactory {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string = `${__dirname}/../../../.env`) {
		const isExisted = fs.existsSync(filePath);
		if (isExisted) {
			this.envConfig = dotenv.parse(fs.readFileSync(filePath));
		} else {
			this.envConfig = process.env;
		}
  }

  get(key: string): string {
    return this.envConfig[key];
	}

	createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.get('DB_HOST'),
      port: parseInt(this.get('DB_PORT'), 10),
      username: this.get('DB_USERNAME'),
      password: this.get('DB_PASSWORD'),
      database: this.get('DB_DATABASE_NAME'),
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
			synchronize: false,
			logger: 'debug',
			migrations: [`${__dirname}/../../migration/*{.ts,.js}`],
			migrationsRun: true,
    };
	}

	createAuthOptions(): IAuthModuleOptions<any> {
		return { defaultStrategy: 'jwt', session: false };
	}
}
