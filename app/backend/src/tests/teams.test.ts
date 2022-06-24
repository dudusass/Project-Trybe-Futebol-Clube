import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
;
import { app } from '../app';
import teams from '../database/models/Teams';


import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
const mockTeams = [
  {
      id: 1,
      teamName: "Avaí/Kindermann"
  },
  {
      id: 2,
      teamName: "Bahia"
  },
  {
      id: 3,
      teamName: "Botafogo"
  },
  {
      id: 4,
      teamName: "Corinthians"
  },
  {
      id: 5,
      teamName: "Cruzeiro"
  },
  {
      id: 6,
      teamName: "Ferroviária"
  },
  {
      id: 7,
      teamName: "Flamengo"
  },
  {
      id: 8,
      teamName: "Grêmio"
  },
  {
      id: 9,
      teamName: "Internacional"
  },
  {
      id: 10,
      teamName: "Minas Brasília"
  },
  {
      id: 11,
      teamName: "Napoli-SC"
  },
  {
      id: 12,
      teamName: "Palmeiras"
  },
  {
      id: 13,
      teamName: "Real Brasília"
  },
  {
      id: 14,
      teamName: "Santos"
  },
  {
      id: 15,
      teamName: "São José-SP"
  },
  {
      id: 16,
      teamName: "São Paulo"
  }
];

describe('Testa rota Teams', () => {
  let chaiHttpResponse: Response;

  describe('Testa para encontrar todos os teams', () => {
    beforeEach(async () => {
      sinon
        .stub(teams, "findAll")
        .resolves([
          {
              id: 1,
              teamName: "Avaí/Kindermann"
          },
          {
              id: 2,
              teamName: "Bahia"
          },
          {
              id: 3,
              teamName: "Botafogo"
          },
          {
              id: 4,
              teamName: "Corinthians"
          },
          {
              id: 5,
              teamName: "Cruzeiro"
          },
          {
              id: 6,
              teamName: "Ferroviária"
          },
          {
              id: 7,
              teamName: "Flamengo"
          },
          {
              id: 8,
              teamName: "Grêmio"
          },
          {
              id: 9,
              teamName: "Internacional"
          },
          {
              id: 10,
              teamName: "Minas Brasília"
          },
          {
              id: 11,
              teamName: "Napoli-SC"
          },
          {
              id: 12,
              teamName: "Palmeiras"
          },
          {
              id: 13,
              teamName: "Real Brasília"
          },
          {
              id: 14,
              teamName: "Santos"
          },
          {
              id: 15,
              teamName: "São José-SP"
          },
          {
              id: 16,
              teamName: "São Paulo"
          }
      ] as teams[])
    });

    afterEach(()=>{
      (teams.findAll as sinon.SinonStub).restore();
    });

    it('Testa para retornar os times corretamente', async () => {

      chaiHttpResponse = await chai.request(app)
        .get('/teams')
        .send();

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('array');

      expect(chaiHttpResponse.body).to.be.deep.equals(mockTeams);
    });
  })

  describe('Testa para encontrar time pelo id', () => {
    beforeEach(async () => {
      sinon
        .stub(teams, "findOne")
        .resolves(
          {
              id: 1,
              teamName: "Avaí/Kindermann",
          } as teams)
    });

    afterEach(()=>{
      (teams.findOne as sinon.SinonStub).restore();
    });

    it('Testa para retornar time corretamente', async () => {

      chaiHttpResponse = await chai.request(app)
        .get('/teams/1')
        .send();

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('object');

      expect(chaiHttpResponse.body).to.be.deep.equals(mockTeams[0]);
    });
  })
});
