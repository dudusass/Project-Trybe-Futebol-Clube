# Trybe Futebol Clube 
![front-example](https://user-images.githubusercontent.com/29557187/164346561-d1bda15e-dfd9-48ae-aed5-f96c2c930f11.png)

# Contexto
Uma aplicação para acompanhar e gerenciar partidas de futebol, permitindo: criar, editar, deletar e obter a classificação dos líderes.

* Realização de dockerização dos apps, network, volume e compose;
* Modelagem de dados com MySQL através do Sequelize;
* Criação e associação de tabelas usando models do sequelize;
* Construção de  uma API REST com endpoints para consumir os models criados;
* Criação de CRUD utilizando ORM
* Testes de integração

## Tecnologias usadas

Front-end:
> Desenvolvido utilizando: React, CSS3, HTML5 (Desenvolvido pela Trybe)

Back-end:
> Desenvolvido utilizando: TypeScript, NodeJs, Express, Sequelize(ORM), Docker e JWT. <br>
Teste de integração utilizando: Mocha, Chai e Sinon.
Banco de dados: MySQL

### Rotas

As rotas a serem utilizadas na aplicação devem ser as seguintes:

* Rota de login: `/login`;
* Rota de login validate: `/login/validate`;
* Rota de clubes: `/clubs`;
* Rota de detalhe clube: `/clubs/{id-club}`;
* Rota de partidas: `/matchs`;
* Rota de detalhe partidas: `/matchs/{id-match}`;
* Rota de classificação por mandante: `/leaderboard/home`;
* Rota de classificação por visitante: `/leaderboard/away`;


## Instalando Dependências

> Pasta raiz
```bash
npm install
``` 

## Executando aplicação

```bash
cd app/ 
npm run compose:up
``` 

* Para rodar o back-end:

  ```
  cd app/backend/ && npm run dev
  ```
* Para rodar o front-end:

  ```
    cd app/frontend/ && npm start
  ```

## Executando testes de cobertura

```bash
cd app/backend/src
npm run test
``` 
