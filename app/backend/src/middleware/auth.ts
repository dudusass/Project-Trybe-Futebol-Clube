import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

function auth(req: Request, res: Response) {
  const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' }).end();
  }

  jwt.verify(authorization, SECRET);
  return res.status(401).json({ message: 'Token not found' }).end();
}

export default auth;
