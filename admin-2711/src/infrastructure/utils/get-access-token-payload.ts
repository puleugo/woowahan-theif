import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../../app/auth/authentication/jwt-constants';
import { IAccessTokenPayload } from '../../app/auth/authentication/interface/access-token-payload.interface';
import * as jwt from 'jsonwebtoken';

export async function getAccessTokenPayload(
  request: Request,
): Promise<IAccessTokenPayload> {
  const token = extractTokenFromHeader(request);
  if (!token) {
    throw new UnauthorizedException();
  }
  try {
    const payload = await verifyAccessToken(token);
    return payload;
  } catch (error) {
    throw new UnauthorizedException();
  }
}

function extractTokenFromHeader(request: Request): string | undefined {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}

async function verifyAccessToken(token: string): Promise<IAccessTokenPayload> {
  return new Promise<IAccessTokenPayload>((resolve, reject) => {
    jwt.verify(token, jwtConstants.secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as IAccessTokenPayload);
      }
    });
  });
}
