import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class VietnameseMeaningDataTypeToText1546155959574 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.changeColumn('word', 'vietnamese_meaning', new TableColumn(
			{
			  name: 'vietnamese_meaning',
			  type: 'text',
			  charset: 'utf8',
			  isNullable: true,
			}));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
