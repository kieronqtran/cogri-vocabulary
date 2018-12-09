import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class Word1544283673198 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.createTable(new Table({
			name: 'word',
			columns: [
				{
					name: 'id',
					type: 'varchar',
					length: '36',
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'uuid' as 'uuid',
				},
				{
					name: 'word',
					type: 'varchar',
					length: '50',
					isNullable: false,
					isUnique: true,
				},
				{
					name: 'vietnamese_meaning',
					type: 'varchar',
					length: '255',
					charset: 'utf8',
					isNullable: true,
				},
				{
					name: 'similar_words',
					type: 'text',
				},
				{
					name: 'examples',
					type: 'text',
				},
				{
					name: 'created_at',
					type: 'datetime(6)',
					default: 'CURRENT_TIMESTAMP(6)',
				},
				{
					name: 'updated_at',
					type: 'datetime(6)',
					default: 'CURRENT_TIMESTAMP(6)',
					onUpdate: 'CURRENT_TIMESTAMP(6)',
				},
				{
					name: 'deleted_at',
					type: 'datetime',
					isNullable: true,
				},
			],
		}), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.dropTable('word', true);
    }

}
