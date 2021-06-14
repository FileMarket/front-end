import React from 'react';
import PropTypes from 'prop-types';
import {
  createMuiTheme,
  ThemeProvider,
  StylesProvider,
  jssPreset,
} from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import Login from './Login';
import Header from './Header';
// import FileList from './FileList';

const theme = createMuiTheme({
  direction: 'rtl',
  typography: {
    fontFamily: ['Vazir', 'Arial', 'sans-serif', 'Roboto'].join(','),
    fontSize: 15,
  },
});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const RTL = props => (
  <StylesProvider jss={jss}>
    {props.children}
  </StylesProvider>
);

RTL.propTypes = {
  children: PropTypes.any,
};

const App = () => (
  <ThemeProvider theme={theme}>
    <RTL>
      <Header />
      <Login />
      {/* <FileList /> */}
    </RTL>
  </ThemeProvider>
);

export default App;
