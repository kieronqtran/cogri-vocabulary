import { Injectable, CacheOptionsFactory, CacheModuleOptions } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AuthOptionsFactory, IAuthModuleOptions } from '@nestjs/passport';
import * as redisStore from 'cache-manager-redis-store';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService implements TypeOrmOptionsFactory, AuthOptionsFactory, CacheOptionsFactory {
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
			logger: 'advanced-console',
			logging: true,
			migrations: [`${__dirname}/../../migration/*{.ts,.js}`],
			migrationsRun: true,
			cache: {
				type: 'redis',
        options: {
					host: this.get('REDIS_HOST'),
					port: parseInt(this.get('REDIS_PORT'), 10),
        },
			},
    };
	}

	createAuthOptions(): IAuthModuleOptions<any> {
		return { defaultStrategy: 'jwt', session: false };
	}

	createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
		return {
			store: redisStore,
			host: this.get('REDIS_HOST'),
			port: parseInt(this.get('REDIS_PORT'), 10),
			ttl: 100,
			max: 10,
		};
	}
}
