import { NextFunction, Request, Response } from 'express';
import Users from '../database/models/Users';

function validateEmail(req: Request, res: Response, next: NextFunction) {
  const { email }: Users = req.body;

  if (!email) {
    return res.status(401).json({ error: 'Incorrect email or password' });
  }

  const emailRegex = /^[a-z0-9\-_]+@[a-z]+\.[a-z]{2,}$/;
  if (emailRegex.test(email) === false) {
    return res.status(400).json({ error: 'All fields must be filled' });
  }

  next();
}

function validatePassword(req: Request, res: Response, next: NextFunction) {
  const { password }: Users = req.body;

  if (password.length <= 6) {
    return res.status(401).json({ error: 'Incorrect email or password' });
  }

  if (!password) {
    return res.status(400).json({ error: 'All fields must be filled' });
  }

  next();
}

export { validateEmail, validatePassword };
