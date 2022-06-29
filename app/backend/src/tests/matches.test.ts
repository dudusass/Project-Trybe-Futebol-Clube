import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Matches';

import { Response } from 'superagent';

import { allMatches, matchesInProgress, matchesFinished, createMatchMock } from './mock/matches'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o model Matches', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(
        allMatches as unknown as Match[]);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('Verifica que é possível listar todas as partidas com sucesso', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .send()

    expect(chaiHttpResponse.status).to.be.equal(200);

    expect(chaiHttpResponse.body[0]).to.have.property('id')
    expect(chaiHttpResponse.body[0]).to.have.property('homeTeam')
    expect(chaiHttpResponse.body[0]).to.have.property('homeTeamGoals')
    expect(chaiHttpResponse.body[0]).to.have.property('awayTeam')
    expect(chaiHttpResponse.body[0]).to.have.property('awayTeamGoals')
    expect(chaiHttpResponse.body[0]).to.have.property('inProgress')
  });
});

describe('Testa o model Matches', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(
        matchesInProgress as unknown as Match[]);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('Verifica que é possível listar as partidas em andamento', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true')
      .send()

    expect(chaiHttpResponse.status).to.be.equal(200);

    expect(chaiHttpResponse.body[0]).to.have.property('id')
    expect(chaiHttpResponse.body[0]).to.have.property('homeTeam')
    expect(chaiHttpResponse.body[0]).to.have.property('homeTeamGoals')
    expect(chaiHttpResponse.body[0]).to.have.property('awayTeam')
    expect(chaiHttpResponse.body[0]).to.have.property('awayTeamGoals')
    expect(chaiHttpResponse.body[0].inProgress).to.be.equal(true)
  });
});

describe('Testa o model Matches', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(
        matchesFinished as unknown as Match[]);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub).restore();
  })

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
});

describe('Testa o model Matches', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "create")
      .resolves(
        createMatchMock as unknown as Match);
  });

  after(() => {
    (Match.create as sinon.SinonStub).restore();
  })

  it('Verifica que não é possível criar partidas sem token validado', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        "homeTeam": 16,
        "awayTeam": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      })
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Token not found');
  })
})

describe('Testa o model Matches', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2NTQ3NDI4MDl9.Lg-GuUJsb-TzC-DWEXu7d5tP9-tC04Mf3aIT0PeZ1WQ"

  it('Verifica que não é possível criar partidas com mesmo Id de times', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set({ authorization: token })
      .send({
        "homeTeam": 16,
        "awayTeam": 16,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      })
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('It is not possible to create a match with two equal teams');
  })
})

describe('Testa o model Matches', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2NTQ3NDI4MDl9.Lg-GuUJsb-TzC-DWEXu7d5tP9-tC04Mf3aIT0PeZ1WQ"

  it('Verifica que não é possível criar partidas com id inexistente', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set({ authorization: token })
      .send({
        "homeTeam": 99,
        "awayTeam": 16,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      })
    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!');
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
      .stub(Match, "create")
      .resolves(
        createMatchMock as unknown as Match);
  });

  after(() => {
    (Match.create as sinon.SinonStub).restore();
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
      .stub(Match, "create")
      .resolves(
        createMatchMock as unknown as Match);
  });

  after(() => {
    (Match.create as sinon.SinonStub).restore();
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