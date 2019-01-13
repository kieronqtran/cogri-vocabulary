import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity({
	name: 'word',
})
@Index(['createdAt', 'id'])
export class Word {

  @PrimaryGeneratedColumn('increment', {
		name: 'id',
	})
  id: number;

  @Column({
		name: 'word',
		type: 'varchar',
		length: 50,
		readonly: true,
		unique: true,
		nullable: false,
	})
  word: string;

  @Column({
		name: 'vietnamese_meaning',
		type: 'text',
		charset: 'utf8',
		nullable: true,
	})
  vietnameseMeaning: string;

  @Column({
		name: 'similar_words',
		type: 'simple-json',
		default: [],
	})
	similarWords: string[];

	@Column({
		name: 'examples',
		type: 'simple-json',
		default: [],
	})
	examples: string[];

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

	constructor(object: Word) {
	  Object.assign(this, object);
  }
}
