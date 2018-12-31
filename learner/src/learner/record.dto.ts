import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class RecordDto {

  @IsString()
  @IsNotEmpty()
  learnerId: string;

  @IsNumber()
  @IsNotEmpty()
  wordId: number;

  startTime: Date;
  endTime: Date;
  totalTime: number;
  isCorrect: boolean;
}

