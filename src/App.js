import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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
import Signup from './Signup';
import Landing from './Landing';

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
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="login" component={Login} />
          <Route exact path="signup" component={Signup} />
        </div>
      </BrowserRouter>
    </RTL>
  </ThemeProvider>
);

export default App;
