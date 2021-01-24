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
