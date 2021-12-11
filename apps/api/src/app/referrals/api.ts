import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

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

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let createResult
  try {
    createResult = await prisma.referral.create({
      data: referralInput,
    });
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(400)
      return res.json({
        errors:[
            {
              value:referralInput.email,
              msg:"That email is already in use",
              param:"referralInput.email",
              location:"body"
            }
          ]
      })
    } else {
      console.error(error)
      res.status(500)
      return res.json({ message: 'Internal Server Error' })
    }
  }

  console.log('Create result', createResult)

  const { id, givenName, surName, email, phone } = createResult

  res.json({ message: 'Successfully created referral', referral: { id, givenName, surName, email, phone }});
};

export const updateReferral = async (req: Request, res: Response) => {
  const { id }: { id?: number } = req.params;
  const { referralInput }: { referralInput?: ReferralInput } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let updateResult
  try {
    updateResult = await prisma.referral.update({
      where: { id: Number(id) },
      data: referralInput,
    });
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(400)
      return res.json({
        errors:[
            {
              value:referralInput.email,
              msg:"That email is already in use",
              param:"referralInput.email",
              location:"body"
            }
          ]
      })
    } else {
      console.error(error)
      res.status(500)
      return res.json({ message: 'Internal Server Error' })
    }
  }

  console.log('Create result', updateResult)

  const { givenName, surName, email, phone } = updateResult

  res.json({ message: 'Successfully updated referral', referral: { id, givenName, surName, email, phone }});
};

export const deleteReferralById = async (req: Request, res: Response) => {
  const { id }: { id?: number } = req.params;
  const referral = await prisma.referral.delete({
    where: { id: Number(id) },
  });

  res.json(referral);
};
