const express = require('express');
const request = require('supertest');

const server = 'http://localhost:3000';

describe('GET /api', () => {
  it('responds with 200 status', () => {
    return request(server)
      .get('/')
      .expect(200)
      .expect('Express + TypeScript Server');
  });
});
