import React from 'react';
import { ReactComponent as BrandLogo } from '../assets/logo.svg';
import style from './App.module.css';
import { ReferralList } from './pages/ReferralList';

export const App = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <BrandLogo className={style.logo} />
      </div>
      <div className={style.listItem}>
        <ReferralList />
      </div>
    </div>
  );
};

export default App;
