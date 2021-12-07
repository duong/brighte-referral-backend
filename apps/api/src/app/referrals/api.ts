import { Request, Response } from 'express';
import prisma from '../prisma';
import { ReferralInput } from '../types/referralInput';

export const getAllReferrals = async (req: Request, res: Response) => {
  const referrals = await prisma.referral.findMany();

  res.json(referrals);
};

export const getReferralById = async (req: Request, res: Response) => {
  const { id }: { id?: number } = req.params;
  const referral = await prisma.referral.findUnique({
    where: { id: Number(id) },
  });

  res.json(referral);
};

export const createReferral = async (req: Request, res: Response) => {
  const { referralInput }: { referralInput?: ReferralInput } = req.body;

  if (!referralInput || !referralInput.givenName || !referralInput.surName || !referralInput.email || !referralInput.phone) {
    console.error('Missing some required inputs ', referralInput)
    res.status(422)
    return res.json({ message: 'Missing required inputs' })
  }

  let createResult
  try {
    createResult = await prisma.referral.create({
      data: referralInput,
    });
  } catch (error) {
    console.error(error)
    res.status(500)
    return res.json({ message: 'Internal Server Error' })
  }

  console.log('Create result', createResult)

  res.json({ message: 'Successfully created referral' });
};
