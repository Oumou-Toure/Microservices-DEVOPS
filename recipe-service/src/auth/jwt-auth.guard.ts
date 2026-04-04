import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const auth = req.headers['authorization'];

    if (!auth || !auth.startsWith('Bearer '))
      throw new UnauthorizedException('Missing or malformed token');

    const token = auth.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'change-me';

    try {
      const payload = jwt.verify(token, secret);
      (req as any).user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}