import * as request from 'supertest';
import app from '../';

describe('Referrals API', () => {

  it('should return all referrals as array', async () => {
    const result = await request(app).get('/referrals');

    expect(result.status).toEqual(200);
    expect(Array.isArray(result.body)).toBe(true);
  });
});
