import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateWordDto {
  @IsString()
  @IsNotEmpty()
  word: string;

	vietnameseMeaning: string;

	similarWords: string[];

	examples: string[];
}

export class UpdateWordDto {

  @IsString()
  @IsNotEmpty()
  word: string;

	vietnameseMeaning: string;

	similarWords: string[];

	examples: string[];
}
