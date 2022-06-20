import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

class Token {
  public SECRET = fs.readFileSync('jwt.evaluation.key');
  public CONFIG = { expiresIn: '7d' };

  static create(info: object) {
    const SECRET = fs.readFileSync('jwt.evaluation.key');
    const CONFIG = { expiresIn: '7d' };
    const { expiresIn } = CONFIG;
    const token = jwt.sign(info, SECRET, { expiresIn, algorithm: 'HS256' });

    return token;
  }

  static decode(token: string) {
    const SECRET = fs.readFileSync('jwt.evaluation.key');
    return jwt.verify(token, SECRET);
  }
}

export default Token;