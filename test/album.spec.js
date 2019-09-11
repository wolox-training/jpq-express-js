'use strict';

const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

console.log(request);
