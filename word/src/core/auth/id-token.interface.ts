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

export interface User {
	sub: string;
	event_id: string;
	'cognito:username': string;
	name: string;
	email: string;
	username: string;
	scope: string;
}
