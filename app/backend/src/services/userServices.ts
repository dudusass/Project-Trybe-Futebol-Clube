import * as bcryptjs from 'bcryptjs';
import { Ilogin } from '../utils/interface';
import Users from '../database/models/Users';
import Token from '../utils/token';

class UserService {
  public login = async ({ email, password }: Ilogin) => {
    const findUser = await Users.findOne({ where: { email } });

    if (!findUser) return { message: 'Incorrect email or password', statusCode: 400 };

    const checkCrypt = await bcryptjs.compare(password, findUser?.password);

    if (!checkCrypt) return { message: 'Incorrect email or password', statusCode: 401 };

    const { id, username, role } = findUser;

    const token = await Token.create({ id, username, role, email, password });

    return {
      user: {
        id,
        username,
        role,
        email,
      },
      token,
    };
  };

  public userRole = async (email: string) => {
    const tokenn = await Token.decode(email);
    const findUser = await Users.findOne({ where: { email: tokenn.email } });

    return findUser?.role;
  };
}

export default UserService;
