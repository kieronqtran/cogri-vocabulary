import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({
	name: 'word',
})
export class Word {

  @PrimaryGeneratedColumn('uuid', {
		name: 'id',
	})
  id: string;

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
		type: 'varchar',
		length: 255,
		charset: 'utf8',
		nullable: true,
	})
  vietnameseMeaning: string;

  @Column({
		name: 'similar_words',
		type: 'simple-array',
		default: [],
	})
	similarWords: string[];

	@Column({
		name: 'examples',
		type: 'simple-array',
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
	})
	deletedAt?: Date;
}
