import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

function auth(req: Request, res: Response, next: NextFunction) {
  const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' }).end();
    }

    jwt.verify(authorization, SECRET);
  } catch (e) {
    return res.status(401).json({ message: 'Token not found' }).end();
  }
  return next();
}

export default auth;
