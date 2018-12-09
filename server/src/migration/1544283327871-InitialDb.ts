import {MigrationInterface, QueryRunner} from 'typeorm';

export class InitialDb1544283327871 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.createDatabase(process.env.DB_DATABASE_NAME || 'cogri_vocabulary', true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.dropDatabase(process.env.DB_DATABASE_NAME || 'cogri_vocabulary', true);
    }
}
