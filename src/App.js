import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import './App.css';

// redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

// MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';

// pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';

// components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';

// theme
const theme = new createMuiTheme(themeFile);

axios.defaults.baseURL =
'https://us-central1-armour-audio.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <Route exact path="/users/:handle" component={user} />
              <Route exact path="/users/:handle/note/:noteId" component={user} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
