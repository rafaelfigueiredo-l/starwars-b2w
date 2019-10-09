const request = require('supertest');
const { expect } = require('chai');
let server;

describe('/', () => {
  beforeEach(() => {
    server = require('../bin/server');
  });
  afterEach(async () => {
    await server.close();
  });

  describe('GET', async () => {
    const exec = async () => {
      return await request(server)
        .get('/')
        .send();
    };

    it('should return a json with the details of the api', async () => {
      const res = await exec();
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('description');
      expect(res.status).to.be.equals(200);
    });
  });
});