import { NextFunction, Request, Response } from 'express';

function validateEmail(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;

  const regex =  /^[a-z0-9\-_]+@[a-z]+\.[a-z]{2,}$/;

  if (!email) {
    return res.status(400).json({ error: 'All fields must be filled' });
  }

  if (!regex.test(email)) {
    return res.status(401).json({ error: 'Incorrect email or password' });
  }

  next();
}

function validatePassword(req: Request, res: Response, next: NextFunction) {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'All fields must be filled' });
  }
  if (password.length <= 6) {
    return res.status(401).json({ error: 'Incorrect email or password' });
  }

  next();
}

export { validateEmail, validatePassword };
