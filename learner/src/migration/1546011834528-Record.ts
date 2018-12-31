import {MigrationInterface, QueryRunner} from "typeorm";
import { Table, TableIndex } from 'typeorm';

export class Record1546011834528 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
          new Table({
              name: 'record',
              columns: [
                  {
                      name: 'id',
                      type: 'int',
                      unsigned: true,
                      isPrimary: true,
                      isGenerated: true,
                      generationStrategy: 'increment',
                  },
                  {
                      name: 'learner_id',
                      type: 'varchar',
                      length: '255',
                      isNullable: false,
                  },
                  {
                      name: 'word_id',
                      type: 'int',
                      unsigned: true,
                      isNullable: false,
                  },
                  {
                      name: 'start_time',
                      type: 'datetime(6)',
                  },
                  {
                      name: 'end_time',
                      type: 'datetime(6)',
                  },
                  {
                      name: 'total_time',
                      type: 'int',
                  },
                  {
                      name: 'is_correct',
                      type: 'boolean',
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
          }),
          true,
        );
        await queryRunner.createIndex('record', new TableIndex({
            columnNames: ['created_at', 'id'],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
