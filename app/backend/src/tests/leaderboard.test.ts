import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa rota leaderboard', () => {
  it('Verifica se retorna as propriedades da tabela de classificação', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/leaderBoard/home')
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.property('name');
    expect(chaiHttpResponse.body[0]).to.have.property('totalPoints');
    expect(chaiHttpResponse.body[0]).to.have.property('totalGames');
    expect(chaiHttpResponse.body[0]).to.have.property('totalVictories');
    expect(chaiHttpResponse.body[0]).to.have.property('totalDraws');
    expect(chaiHttpResponse.body[0]).to.have.property('totalLosses');
    expect(chaiHttpResponse.body[0]).to.have.property('goalsFavor');
    expect(chaiHttpResponse.body[0]).to.have.property('goalsOwn');
    expect(chaiHttpResponse.body[0]).to.have.property('goalsBalance');
    expect(chaiHttpResponse.body[0]).to.have.property('efficiency');
  });
})