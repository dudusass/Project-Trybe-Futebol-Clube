import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { readFileSync } from 'fs';

import Users from '../database/models/Users';
import Matches from '../database/models/Matches';

chai.use(chaiHttp);

const { expect } = chai;