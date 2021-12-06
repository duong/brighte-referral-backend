import { getByText, render, waitFor } from '@testing-library/react';
import React from 'react';
import { Referral } from '../../types/referral';
import { ReferralTable } from './ReferralTable';

describe('ReferralTable', () => {

  const testReferrals: Referral[] = [
    {
      id: 1,
      givenName: 'John',
      surName: 'Doe',
      phone: '0456 123123',
      email: 'testing@brighte.com.au',
    },
    {
      id: 2,
      givenName: 'Another',
      surName: 'Referral',
      phone: '0456 345345',
      email: 'referral@gmail.com',
    },
  ];

  it('should render headers correctly', async () => {
    const { baseElement } = render(<ReferralTable referrals={[]} />);
    await waitFor(() => getByText(baseElement as HTMLElement, 'Given Name'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Surname'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Email'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Phone'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Actions'));
  });

  it('should render referral fields', async () => {
    const { baseElement } = render(<ReferralTable referrals={testReferrals} />);
    await waitFor(() => getByText(baseElement as HTMLElement, 'John'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Doe'));
    await waitFor(() => getByText(baseElement as HTMLElement, '0456 123123'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'testing@brighte.com.au'));

    await waitFor(() => getByText(baseElement as HTMLElement, 'Another'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Referral'));
    await waitFor(() => getByText(baseElement as HTMLElement, '0456 345345'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'referral@gmail.com'));
  });
});
