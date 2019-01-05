import {
  Injectable,
  CacheOptionsFactory,
  CacheModuleOptions,
	HttpModuleOptionsFactory,
	HttpModuleOptions,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AuthOptionsFactory, IAuthModuleOptions } from '@nestjs/passport';
import { createTransport } from 'nodemailer';
import * as redisStore from 'cache-manager-redis-store';
import { Credentials } from 'aws-sdk';
import { SubscriptionOptionsFactory, SubscriptionModuleOptions } from '../../subscription/interface/subscription-options.interface';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService implements
	AuthOptionsFactory,
	CacheOptionsFactory,
	TypeOrmOptionsFactory,
	SubscriptionOptionsFactory,
	HttpModuleOptionsFactory {
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
    };
  }

  createAuthOptions(): IAuthModuleOptions<any> {
    return { defaultStrategy: 'jwt', session: false };
  }

	createSubscriptionOptions(): SubscriptionModuleOptions {
		const credentials = new Credentials({
			accessKeyId: this.get('AWS_ACCESS_KEY'),
			secretAccessKey: this.get('AWS_SECRET_KEY'),
		});
		return {
			redis: {
				host: this.get('REDIS_HOST'),
				port: parseInt(this.get('REDIS_PORT'), 10),
			},
			aws: {
				credentials,
				region: this.get('AWS_REGION'),
				userPoolId: this.get('AWS_COGNITO_USERPOOL_ID'),
			},
			mailer: {
				transport: createTransport({
					host: 'smtp.gmail.com',
					port: 465,
					secure: true,
					auth: {
						type: 'OAuth2',
						user: this.get('APP_GMAIL'),
						clientId: this.get('GOOGLE_CLIENT_ID'),
						clientSecret: this.get('GOOGLE_CLIENT_SECRET'),
						refreshToken: this.get('GOOGLE_GMAIL_REFRESH_TOKEN'),
					},
				}),
			},
			email: this.get('APP_GMAIL'),
			defaultCron: this.get('APP_SEND_EMAIL_CRON'),
			queueKey: 'query_email',
			tz: this.get('tz') || 'Etc/UTC',
		};
	}

	createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
		return {
			store: redisStore,
			host: this.get('REDIS_HOST'),
			port: parseInt(this.get('REDIS_PORT'), 10),
			ttl: 5,
			max: 10,
		};
	}

	createHttpOptions(): Promise<HttpModuleOptions> | HttpModuleOptions {
		return {
		};
	}
}
