import React, { useEffect, useState } from 'react';

import { ReferralTable } from '../../components/ReferralTable';
import { getAllReferrals } from '../../managers/api';
import { Referral } from '../../types/referral';
import style from './ReferralList.module.css';

const ReferralList: React.FC = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);

  const getData = async () => {
    const { data } = await getAllReferrals()
    setReferrals(data)
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <div className={style.frame}>
      <ReferralTable referrals={referrals} setReferrals={setReferrals}/>
    </div>
  );
};

export { ReferralList };
