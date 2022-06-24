import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota login', () => {
   let chaiHttpResponse: Response;

   before(async () => {
     sinon
       .stub(Users, "findOne")
       .resolves({
          id: 1,
          username: 'Admin',
          role: 'admin',
          email:'admin@admin.com',
          password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
       } as Users);
   });

   after(()=>{
     (Users.findOne as sinon.SinonStub).restore();
   })

   it('Verifica que é possível fazer login com sucesso', async () => {
     chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email:'admin@admin.com',
          password: 'secret_admin'
        })

     expect(chaiHttpResponse.status).to.be.equal(200);
     expect(chaiHttpResponse.body).to.not.have.property('password')
     expect(chaiHttpResponse.body).to.have.property('user')
     expect(chaiHttpResponse.body).to.have.property('token')
   });
});

describe('Testa que não é possível acesso com email inválido',() => {
  let chaiHttpResponse: Response;

   before(async () => {
     sinon
       .stub(Users, "findOne")
       .resolves({
          id: 1,
          username: 'Admin',
          role: 'admin',
          email:'admin@admin.com',
          password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
       } as Users);
   });

   after(()=>{
     (Users.findOne as sinon.SinonStub).restore();
   })

   it('Verifica que não é possível fazer login com email inválido', async () => {
     chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email:'admin@admin',
          password: 'secret_admin'
        })

     expect(chaiHttpResponse.status).to.be.equal(401);
});
});

describe('Testa que não é possível acesso com senha inválida',() => {
  let chaiHttpResponse: Response;

   before(async () => {
     sinon
       .stub(Users, "findOne")
       .resolves({
          id: 1,
          username: 'Admin',
          role: 'admin',
          email:'admin@admin.com',
          password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
       } as Users);
   });

   after(()=>{
     (Users.findOne as sinon.SinonStub).restore();
   })

   it('Verifica que não é possível fazer login com senha inválida', async () => {
     chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email:'admin@admin.com',
          password: '123'
        })

     expect(chaiHttpResponse.status).to.be.equal(401);
});
});

describe('Testa que não é possível acesso sem email',() => {
  let chaiHttpResponse: Response;

   before(async () => {
     sinon
       .stub(Users, "findOne")
       .resolves({
          id: 1,
          username: 'Admin',
          role: 'admin',
          email:'admin@admin.com',
          password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
       } as Users);
   });

   after(()=>{
     (Users.findOne as sinon.SinonStub).restore();
   })

   it('Verifica que não é possível fazer login sem email', async () => {
     chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          password: 'secret_admin'
        })

     expect(chaiHttpResponse.status).to.be.equal(400);
});
});

describe('Testa que não é possível acesso sem senha',() => {
  let chaiHttpResponse: Response;

   before(async () => {
     sinon
       .stub(Users, "findOne")
       .resolves({
          id: 1,
          username: 'Admin',
          role: 'admin',
          email:'admin@admin.com',
          password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
       } as Users);
   });

   after(()=>{
     (Users.findOne as sinon.SinonStub).restore();
   })

   it('Verifica que não é possível fazer login sem senha', async () => {
     chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email:'admin@admin.com'
        })

     expect(chaiHttpResponse.status).to.be.equal(400);
});
});

function after(_arg0: () => void) {
  throw new Error('Function not implemented.');
}
function before(_arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}

