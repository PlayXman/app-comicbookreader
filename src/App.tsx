import React from 'react';
import './App.css';
import {createMuiTheme, ThemeProvider} from '@material-ui/core';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./views/Home";
import NoMatch from "./views/NoMatch";

const theme = createMuiTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
