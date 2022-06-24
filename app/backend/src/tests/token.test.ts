import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { readFileSync } from 'fs';
import { sign } from 'jsonwebtoken'

chai.use(chaiHttp);

const { expect } = chai;
const secret: string = readFileSync('./jwt.evaluation.key', 'utf-8');

describe('Testa rota /validate', () => {
  it ('validate token', async () => {
    const user = {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
    }
    const token = sign(user, secret);

    const chaiHttpResponse: Response = await chai.request(app)
      .get('/login/validate')
      .set('authorization', token)
      .send();

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.text).to.be.equal('admin');
  });

  it ('Testa sem token', async () => {
    const chaiHttpResponse: Response = await chai.request(app)
      .get('/login/validate')
      .send();

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('Token not found');
  });

  it ('Testa invalid token', async () => {
    const token = 'tokenInvalid';

    const chaiHttpResponse: Response = await chai.request(app)
      .get('/login/validate')
      .set('authorization', token)
      .send();

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('Token not found');
  });
});