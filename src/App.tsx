import React from 'react';
import {createMuiTheme, CssBaseline, ThemeProvider} from '@material-ui/core';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./views/Home";
import NoMatch from "./views/NoMatch";
import config from "./config";
import Login from "./views/Login";
import {DataProvider} from "./components/DataContext";
import PrivateRoute from "./components/PrivateRoute";
import Authentication from "./components/Authentication";
import Layout from "./components/Layout";
import Book from "./views/Book";

// MUI Theme init
const theme = createMuiTheme(config.theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <DataProvider>
          <Layout>
            <Authentication>
              <Switch>
                <PrivateRoute exact path="/">
                  <Home/>
                </PrivateRoute>
                <PrivateRoute exact path="/book/:id">
                  <Book/>
                </PrivateRoute>
                <Route path="/login">
                  <Login/>
                </Route>
                <Route path="*">
                  <NoMatch/>
                </Route>
              </Switch>
            </Authentication>
          </Layout>
        </DataProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
