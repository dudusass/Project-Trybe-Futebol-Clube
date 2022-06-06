import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import Users from '../database/models/Users';
import Token from '../utils/token';

export default class UserController {
  userModel: Users;

  constructor() {
    this.userModel = new Users();
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    // const passwordCrypt = await bcrypt.hash(password, 1);

    const findUser = await Users.findOne({ where: { email, password },
      attributes: { exclude: ['password'] } });

    if (!findUser) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    /*   if (!bcrypt.compareSync(password, findUser.password)) {
      return res.status(400).json({
        message: 'All fields must be filledddddd' });
    } */

    const { id } = findUser;

    const token = Token.create({ id, email });

    return res.status(200).json({ findUser, token });
  }
}
