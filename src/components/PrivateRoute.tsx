import React from 'react';
import {Redirect, Route, RouteProps} from "react-router-dom";
import {useContext} from "./DataContext";

const PrivateRoute: React.FC<RouteProps> = ({children, ...rest}) => {
  const currentUser = useContext().user;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser.length ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;