import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './App.css';

// MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';

// pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

// components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

// theme
const theme = new createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <div className="App">
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <AuthRoute exact path="/" component={home} />
            <AuthRoute exact path="/login" component={login} authenticated={authenticated}/>
            <AuthRoute exact path="/signup" component={signup} authenticated={authenticated}/>
          </Switch>
        </div>
      </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
