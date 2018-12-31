import { Injectable, OnModuleInit, HttpService } from '@nestjs/common';

// tslint:disable-next-line:no-var-requires
const jwkToPem = require('jwk-to-pem');

export interface Key {
	alg: string;
	e: string;
	kid: string;
	kty: string;
	n: string;
	use: string;
}

export interface ResponseBody {
	keys: Key[];
}

export interface JwtPayload {
	sub: string;
	event_id: string;
	token_use: string;
	scope: string;
	auth_time: number;
	iss: string;
	exp: number;
	iat: number;
	version: number;
	jti: string;
	client_id: string;
	username: string;
}

export interface IdToken {
	at_hash: string;
	sub: string;
	email_verified: boolean;
	iss: string;
	'cognito:username': string;
	aud: string;
	event_id: string;
	token_use: string;
	auth_time: number;
	name: string;
	exp: number;
	iat: number;
	email: string;
}

const cognitoUrl = `https://cognito-idp.us-east-1.amazonaws.com/us-east-1_NRZHxhBEi`;

@Injectable()
export class KeyCacheService implements OnModuleInit {

	private pemKeys: { [key: string]: string } = {};

	constructor(private readonly httpService: HttpService) { }

	getSecretOrKey(req: Request, rawToken: string, done: (err, pem: string) => void) {
		const header: string = JSON.parse(Buffer.from(rawToken.split('.')[0], 'base64').toString()).kid;
		const pem = this.pemKeys[header];
		done(undefined, pem);
	}

	async onModuleInit() {
		const url = `${cognitoUrl}/.well-known/jwks.json`;
		const response = await this.httpService.get<ResponseBody>(url).toPromise();
		const body = response.data;
		for (const key of body.keys) {
			// Convert each key to PEM
			const key_id = key.kid;
			const modulus = key.n;
			const exponent = key.e;
			const key_type = key.kty;
			const jwk = { kty: key_type, n: modulus, e: exponent};
			const pem = jwkToPem(jwk);
			this.pemKeys[key_id] = pem;
		}
	}

}
