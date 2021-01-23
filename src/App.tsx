import React from 'react';
import {createMuiTheme, ThemeProvider} from '@material-ui/core';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./views/Home";
import NoMatch from "./views/NoMatch";
import config from "./config";
import Login from "./views/Login";
import {DataContext, defaultData} from "./components/DataContext";
import PrivateRoute from "./components/PrivateRoute";
import Authentication from "./components/Authentication";

// MUI Theme init
const theme = createMuiTheme(config.theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DataContext.Provider value={defaultData}>
        <Authentication>
          <Router>
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
          </Router>
        </Authentication>
      </DataContext.Provider>
    </ThemeProvider>
  );
}

export default App;
