import React, { useEffect, useState } from 'react';
import { ReferralTable } from '../../components/ReferralTable';
import { Referral } from '../../types/referral';
import style from './ReferralList.module.css';

const ReferralList: React.FC = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/referrals')
      .then((r) => r.json())
      .then(setReferrals);
  }, []);

  return (
    <div className={style.frame}>
      <ReferralTable referrals={referrals} />
    </div>
  );
};

export { ReferralList };
