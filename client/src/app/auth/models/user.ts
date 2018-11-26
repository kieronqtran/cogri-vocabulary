export interface Credentials {
  email: string;
  password: string;
}

export interface User {
	sub: string;
	'cognito:groups': string[];
	email_verified: boolean;
	iss: string;
	phone_number_verified: boolean;
	'cognito:username': string;
	given_name: string;
	aud: string;
	event_id: string;
	token_use: string;
	auth_time: number;
	name: string;
	phone_number: string;
	exp: number;
	iat: number;
	family_name: string;
	email: string;
}
