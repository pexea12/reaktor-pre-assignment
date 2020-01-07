import request from 'supertest';

import { app } from '../src/app';


describe('Correct response', () => {
  it('should contain 700 items', async () => {
    const res = await request(app).get('/');

    expect(res.status).toEqual(200);
    expect(res.body.length).toEqual(700);
  })

  it('2nd element (from 0) should be tcpd', async () => {
    const res = await request(app).get('/');

    expect(res.body[2].index).toEqual(2);
    expect(res.body[2].name).toEqual('tcpd');
    expect(res.body[2].reverse_depend_ids.length).toEqual(0);
    expect(res.body[2].depends.length).toEqual(2);
  });
})


