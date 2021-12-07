import * as cors from 'cors';
import * as express from 'express';
import { getAllReferrals, getReferralById, createReferral } from './referrals/api';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/referrals', getAllReferrals);
app.post('/referrals', createReferral);
app.get('/referrals/:id', getReferralById);

export default app;
