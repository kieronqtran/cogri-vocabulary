import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { WordController } from './word.controller';
import { WordService } from './word.service';
import { WordModule } from './word.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './word.entity';
import { AppTestingModule } from '../../../test/app.testing.module';

describe('WordModule v1', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
			imports: [
				WordModule,
				AppTestingModule,
			],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
	});

	describe('GET /', () => {
		it('should be defined', () => {
			return request(app.getHttpServer())
				.get('/')
				.expect(200)
				.expect(res => {
					expect(res.body).toMatchSnapshot();
				});
		});
	});

});
