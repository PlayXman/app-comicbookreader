import React, {useEffect, useState} from 'react';
import firebase from "firebase";
import Loader from "./Loader";
import {useContext} from "./DataContext";

interface AuthenticationProps {
  children: any
}

const Authentication: React.FC<AuthenticationProps> = ({children}) => {
  const [loaded, setLoaded] = useState(false);
  const context = useContext();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      context.user = user ? user.uid : '';
      setLoaded(true);
    });
  }, [context]);

  if(loaded) {
    return children;
  } else {
    return <Loader />;
  }
};

export default Authentication;