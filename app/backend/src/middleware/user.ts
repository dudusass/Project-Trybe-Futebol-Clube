import { NextFunction, Request, Response } from 'express';

function validateEmailandPassword(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' }).end();
  }

  const regex = /^[a-z0-9\-_]+@[a-z]+\.[a-z]{2,}$/;

  if (!regex.test(email) || password.length <= 6) {
    return res.status(401).json({ message: 'Incorrect email or password' }).end();
  }

  return next();
}

export default validateEmailandPassword;
