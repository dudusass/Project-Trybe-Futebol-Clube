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
});

it('Verifica que é possível listar as partidas finalizadas', async () => {
  chaiHttpResponse = await chai
    .request(app)
    .get('/matches?inProgress=false')
    .send()

  expect(chaiHttpResponse.status).to.be.equal(200);
  expect(chaiHttpResponse.body).to.be.an('array');
  expect(chaiHttpResponse.body[0]).to.have.property('id')
  expect(chaiHttpResponse.body[0]).to.have.property('homeTeam')
  expect(chaiHttpResponse.body[0]).to.have.property('homeTeamGoals')
  expect(chaiHttpResponse.body[0]).to.have.property('awayTeam')
  expect(chaiHttpResponse.body[0]).to.have.property('awayTeamGoals')
  expect(chaiHttpResponse.body[0].inProgress).to.be.equal(false)
  expect(chaiHttpResponse.body[0]).to.have.property('inProgress');
});

  it ('Testa que não é criar partida com dois times iguas', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/matches')
      .set({ authorization: token })
      .send({
        "homeTeam": 16,
        "awayTeam": 16,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      })

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('It is not possible to create a match with two equal teams');
  })

  it ('Testa que não é possivel encontrar um time sem ele existir', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/matches')
      .set({ authorization: token })
      .send({
        "homeTeam": 99,
        "awayTeam": 16,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      })

    expect(chaiHttpResponse).to.have.status(404);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id');
  })

  it('Verifica que é possível criar partidas com sucesso', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set({ authorization: token })
      .send({
        "homeTeam": 16,
        "awayTeam": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      })
    expect(chaiHttpResponse.status).to.be.equal(201);
  })
})

describe('Testa o model Matches', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;
  let wrongToken = "1234567abcdef"
  before(async () => {
    sinon
      .stub(Matches, "create")
      .resolves(
        Matches as unknown as Matches);
  });

  after(() => {
    (Matches.create as sinon.SinonStub).restore();
  })

  it('Verifica que não é possível criar partidas com token inválido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set({ authorization: wrongToken })
      .send({
        "homeTeam": 16,
        "awayTeam": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      })
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Invalid Token');
  })
})

describe('Testa o model Matches', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2NTQ3NDI4MDl9.Lg-GuUJsb-TzC-DWEXu7d5tP9-tC04Mf3aIT0PeZ1WQ"
  before(async () => {
    sinon
      .stub(Matches, "create")
      .resolves(
        Matches as unknown as Matches);
  });

  after(() => {
    (Matches.create as sinon.SinonStub).restore();
  })

  it('Verifica que é possível criar partidas com sucesso', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set({ authorization: token })
      .send({
        "homeTeam": 16,
        "awayTeam": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      })
    expect(chaiHttpResponse.status).to.be.equal(201);
  })
})

function before(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}


function after(arg0: () => void) {
  throw new Error('Function not implemented.');
}
