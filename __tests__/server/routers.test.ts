// const express = require('express');
const request = require('supertest');

const server = 'http://localhost:3000';

describe('Server', () => {
  it('responds with 200 status', () => request(server)
    .get('/')
    .expect(200)
    .expect('Express + TypeScript Server'));
});
