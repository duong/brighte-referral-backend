import * as request from 'supertest';

import app from '../';
import { ReferralInput } from '../types/referralInput';

const mikeWazowski: ReferralInput = {
  givenName: 'Mike',
  surName: 'Wazowski',
  email: 'mikewazowski@gmail.com',
  phone: '0411222333',
}

describe('Referrals API', () => {

  it('should return all referrals as array', async () => {
    const result = await request(app).get('/referrals');

    expect(result.status).toEqual(200);
    expect(Array.isArray(result.body)).toBe(true);
  });

  it('should not create referral with short givenName', async () => {
    const referralInput: ReferralInput = {...mikeWazowski, givenName: 'M'}
    const result = await request(app).post('/referrals').send({ referralInput });
    expect(result.status).toEqual(400);
    expect(Array.isArray(result.body.errors)).toBe(true);
  });

  it('should not create referral with short surName', async () => {
    const referralInput: ReferralInput = {...mikeWazowski, surName: 'W'}
    const result = await request(app).post('/referrals').send({ referralInput });
    expect(result.status).toEqual(400);
    expect(Array.isArray(result.body.errors)).toBe(true);
  });

  it('should not create referral with bad email', async () => {
    const referralInput: ReferralInput = {...mikeWazowski, email: 'foobar'}
    const result = await request(app).post('/referrals').send({ referralInput });
    expect(result.status).toEqual(400);
    expect(Array.isArray(result.body.errors)).toBe(true);
  });

  it('should not create referral with bad phone', async () => {
    const referralInput: ReferralInput = {...mikeWazowski, phone: '041122233'}
    const result = await request(app).post('/referrals').send({ referralInput });
    expect(result.status).toEqual(400);
    expect(Array.isArray(result.body.errors)).toBe(true);
  });
});
