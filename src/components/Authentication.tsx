import React, {useEffect, useState} from 'react';
import firebase from "firebase";
import Loader from "./Loader";
import {useContext} from "./DataContext";

interface AuthenticationProps {
  children: any
}

const Authentication: React.FC<AuthenticationProps> = ({children}) => {
  const [loaded, setLoaded] = useState(false);
  const {setData} = useContext();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setData({user: user ? user.uid : ''});
      setLoaded(true);
    });
  }, [setData]);

  if(loaded) {
    return children;
  } else {
    return <Loader />;
  }
};

export default Authentication;