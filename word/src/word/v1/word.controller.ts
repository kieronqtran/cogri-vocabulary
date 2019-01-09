import {
  Controller,
  Param,
  Get,
  Body,
  Post,
  Put,
  Delete,
  Query,
	Patch,
} from '@nestjs/common';
import { WordService } from './word.service';
import { CreateWordDto, LearnedWordDTO, UpdateWordDto } from './word.dto';
import { GetAllOptions } from './get-all-options';

@Controller()
export class WordController {
  constructor(private readonly wordService: WordService) {}

	@Post('random')
  async getRandom(@Body() entity: LearnedWordDTO) {
    return this.wordService.getRandomWord(entity);
  }

  @Post('sequence')
  async getSequence(@Body() entity: LearnedWordDTO) {
    return this.wordService.getSequenceWord(entity);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.wordService.getById(id);
  }

  @Get()
  async get(
    @Query('nextPageToken') nextPageToken: string,
    @Query('q') query: string,
    @Query('orderBy') orderBy,
    @Query('maxResults') maxResults = 20,
  ) {
    const options = new GetAllOptions()
      .setMaxResults(maxResults)
      .setOrderBy(orderBy)
      .setQuery(query)
      .setNextPageToken(nextPageToken);
    return this.wordService.get(options);
  }

  @Post()
  async create(@Body() entity: CreateWordDto) {
    return this.wordService.create(entity);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() entity: UpdateWordDto) {
    return this.wordService.update(id, entity);
  }

	@Patch(':id')
  async patch(@Param('id') id: string, @Body() entity: UpdateWordDto) {
    return this.wordService.patch(id, entity);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.wordService.delete(id);
  }
}
