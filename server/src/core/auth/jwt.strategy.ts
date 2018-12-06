
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy, AbstractStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { Request } from 'express';

import * as passport from 'passport';
import { KeyCacheService } from './key-cache.service';
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

const cognitoUrl = `https://cognito-idp.us-east-1.amazonaws.com/us-east-1_NRZHxhBEi`;

@Injectable()
export class JwtStrategy extends Strategy {
  constructor(private readonly keyCacheService: KeyCacheService) {
    super(
      {
        algorithms: ['RS256'],
        secretOrKeyProvider: (req, rawToken, done) =>
          this.keyCacheService.getSecretOrKey(req, rawToken, done),
        issuer: cognitoUrl,
        passReqToCallback: true,
        jwtFromRequest: ExtractJwt.fromExtractors([
          ExtractJwt.fromAuthHeaderAsBearerToken(),
          ExtractJwt.fromUrlQueryParameter('access_token'),
          req => {
            const cookieKeys = Object.keys(req.cookies);
            const lastAuthUserKey = cookieKeys.find(value =>
              value.endsWith('LastAuthUser'),
            );
            const accessTokenKey = cookieKeys.find(value =>
              value.endsWith(`${req.cookies[lastAuthUserKey]}.accessToken`),
            );
            return req.cookies[accessTokenKey] || null;
          },
        ]),
      },
      async (req, payload, next) => await this.validate(req, payload, next),
    );
    passport.use('jwt', this);
  }

  async validate(req: Request, payload: any, next: VerifiedCallback) {
    const cookieKeys = Object.keys(req.cookies);
    const lastAuthUserKey = cookieKeys.find(value =>
      value.endsWith('LastAuthUser'),
    );
    const idTokenKey = cookieKeys.find(value =>
      value.endsWith(`${req.cookies[lastAuthUserKey]}.idToken`),
    );
    const idToken = req.cookies[idTokenKey] || null;
    const idTokenObject: IdToken = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());
    const user: User = {
      'cognito:username': idTokenObject['cognito:username'],
      'email': idTokenObject.email,
      'username': idTokenObject['cognito:username'],
      'name': idTokenObject.name,
      'sub': idTokenObject.sub,
      'scope': payload.scope,
      'event_id': payload.event_id,
    };
    next(null, user);
  }
}
