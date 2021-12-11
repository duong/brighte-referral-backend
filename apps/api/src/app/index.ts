import * as cors from 'cors';
import * as express from 'express';

import { createReferral, deleteReferralById, getAllReferrals, getReferralById, updateReferral } from './referrals/api';
import { createReferralValidator } from './referrals/validator';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/referrals', getAllReferrals);
app.post('/referrals', createReferralValidator(), createReferral);
app.get('/referrals/:id', getReferralById);
app.put('/referrals/:id', createReferralValidator(), updateReferral);
app.delete('/referrals/:id', deleteReferralById);

export default app;
