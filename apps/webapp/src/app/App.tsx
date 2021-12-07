import React from 'react';
import { ReactComponent as BrandLogo } from '../assets/logo.svg';
import style from './App.module.css';
import { ReferralList } from './pages/ReferralList';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#00d280",
    },
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className={style.container}>
        <div className={style.header}>
          <BrandLogo className={style.logo} />
        </div>
        <div className={style.listItem}>
          <ReferralList />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
