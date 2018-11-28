import { Get, Controller, Query, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.root();
	}

	@Get('auth/cognito/callback')
	cognitoCallback(@Query('id_token') idToken: string, @Query('access_token') accessToken: string, @Req() req: Request, @Res() res: Response) {
		console.log(req);
		res.cookie('id_token', idToken, { domain: 'localhost', path: '/' });
		res.cookie('access_token', accessToken, { domain: 'localhost', path: '/' });
		res.redirect('/');
	}
}
