import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { readFileSync } from 'fs';

import Users from '../database/models/Users';
import Matches from '../database/models/Matches';
import token from '../utils/token';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota matches', () => {
  let chaiLoginData: Response;
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matches, 'create')
      .resolves({
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 2,
        awayTeam: 8,
        awayTeamGoals: 2,
        inProgress: true,
      } as Matches);

    sinon
      .stub(Users, 'findOne')
      .resolves({
        id: 1,
        username: 'admin',
        email: 'admin@admin.com',
        role: 'admin',
        password: '$2a$04$M7hUZciSJWdhCiPsAWkpqeAT4gEAkgTBGnSG0CHyxrlM4Hw6i/4.i',
      } as Users);
  });

  after(()=>{
    (Matches.create as sinon.SinonStub).restore();
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Verifica que é possível criar uma partida corretamente', async () => {
    chaiLoginData = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      })

    chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', chaiLoginData.body.token)
        .send({
          homeTeam: 16,
          homeTeamGoals: 2,
          awayTeam: 8,
          awayTeamGoals: 2,
          inProgress: true,
        })

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body).to.have.property('homeTeam');
    expect(chaiHttpResponse.body).to.have.property('homeTeamGoals');
    expect(chaiHttpResponse.body).to.have.property('awayTeam');
    expect(chaiHttpResponse.body).to.have.property('awayTeamGoals');
    expect(chaiHttpResponse.body).to.have.property('inProgress');
  });

  it('Testa que não é possível cadastrar uma nova partida com token inválido', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/matches')
    .set('authorization', 'tokeninvalido')
    .send({
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 8,
      awayTeamGoals: 2,
      inProgress: true,
    })

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
  });

  it('Não é possível cadastrar uma nova partida sem token', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/matches')
    .send({
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 8,
      awayTeamGoals: 2,
      inProgress: true,
    })

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
  });

  it('Não é possível criar partidas com id inexistente', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set({ authorization: token })
      .send({
        homeTeam: 16,
        homeTeamGoals: 2,
        awayTeam: 8,
        awayTeamGoals: 2,
        inProgress: true,
      })
    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.have.property('message');
  })

  it('Verifica que é possível listar as partidas em andamento', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true')
      .send()

    expect(chaiHttpResponse.status).to.be.equal(200);

    expect(chaiHttpResponse.body[0]).to.have.property('id')
})

})

function before(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}


function after(arg0: () => void) {
  throw new Error('Function not implemented.');
}
