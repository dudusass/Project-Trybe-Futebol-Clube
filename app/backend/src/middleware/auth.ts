import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

function auth(req: Request, res: Response, next: NextFunction) {
  const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const tokenn:any = jwt.verify(token, SECRET);
  if (!tokenn) {
    return res.status(401).json({ message: 'Token invalid' });
  }

  next();
}

export default auth;
