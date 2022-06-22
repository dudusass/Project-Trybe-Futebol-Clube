import { Request, Response } from 'express';
import UserServices from '../services/userServices';

class UserController {
  private userService: UserServices;

  constructor() {
    this.userService = new UserServices();
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const validLogin = await this.userService.login({ email, password });
    if (validLogin?.message) {
      return res.status(validLogin.statusCode).json({ message: validLogin.message });
    }

    return res.status(200).json(validLogin);
  }

  async validate(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const validToken = await this.userService.userRole(authorization);

    return res.status(200).json(validToken);
  }
}

export default UserController;
