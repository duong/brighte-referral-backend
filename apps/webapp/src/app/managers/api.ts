import axios from 'axios';
import { ReferralInput } from '../types/referralInput';

const baseUrl = 'http://localhost:3333'

export const getAllReferrals = async () => {
  return axios.get(`${baseUrl}/referrals`)
};

export const getReferralById = async (id: number) => {
  return axios.get(`${baseUrl}/referrals/${id}`)
};

export const createReferral = async (referralInput: ReferralInput) => {
  return axios.post(`${baseUrl}/referrals`, { referralInput })
};

export const updateReferral = async (referralInput: ReferralInput, id: number) => {
  return axios.put(`${baseUrl}/referrals/${id}`, { referralInput })
};

export const deleteReferralById = async (id: number) => {
  return axios.delete(`${baseUrl}/referrals/${id}`)
};
