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
import Upload from './Upload';
import Login from './Login';

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
      <Login />
      <Upload />
    </RTL>
  </ThemeProvider>
);

export default App;
