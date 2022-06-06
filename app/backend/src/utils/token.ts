import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

class Token {
  static create(info: object) {
    const SECRET = fs.readFileSync('./jwt.evaluation.key').toString();
    return jwt.sign(info, SECRET, { expiresIn: '7d' });
  }

  static decode(token: string) {
    const SECRET = fs.readFileSync('./jwt.evaluation.key').toString();
    return jwt.verify(token, SECRET);
  }
}

export default Token;
