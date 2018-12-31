import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

/**
 * SELECT DISTINCT learner_id AS learner,YEAR(end_time) AS year, WEEKOFYEAR(end_time) AS week, COUNT(learner_id) AS no_quesitons, SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) AS no_correct FROM record GROUP BY YEAR(end_time), WEEKOFYEAR(end_time), learner_id;
 */

@Entity({name: 'record'})
@Index(['createdAt', 'id'])
export class Word {

  @PrimaryGeneratedColumn('increment', {
    name: 'id',
  })
  id: number;

  @Column({
    name: 'learner_id',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  learnerId: string;

  @Column({
    name: 'word_id',
    type: 'int',
    nullable: false,
  })
  wordId: number;

  @Column({
    name: 'start_time',
    type: 'datetime',
  })
  startTime: Date;

  @Column({
    name: 'end_time',
    type: 'datetime',
  })
  endTime: Date;

  @Column({
    name: 'total_time',
    type: 'int',
  })
  totalTime: number;

  @Column({
    name: 'is_correct',
    type: Boolean,
  })
  isCorrect: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;

  // Soft-delete is not supported by orm yet
  @Column({
    name: 'deleted_at',
    nullable: true,
    select: false,
  })
  deletedAt?: Date;
}
