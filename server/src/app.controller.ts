import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Scopes } from './components/decorators/scopes.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

	@Get()
	@Scopes('https://corgi-vocabulary.tranhuuquang.me/word.readonly')
  root(): string {
    return this.appService.root();
	}
}
