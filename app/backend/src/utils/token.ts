import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

class Token {
  static async create(info: object) {
    const SECRET = fs.readFileSync('jwt.evaluation.key');
    const token = jwt.sign(info, SECRET.toString('utf-8'));

    return token;
  }
}

export default Token;