import {ThemeOptions} from '@material-ui/core';

interface Config {
  firebase: {}
  theme: ThemeOptions;
}

const config: Config = {
  firebase: {
    apiKey: "AIzaSyAGpSQbBWbJ4LEHJTxGQpw1acMZDC4A2IY",
    authDomain: "aa-comics.firebaseapp.com",
    projectId: "aa-comics",
    storageBucket: "aa-comics.appspot.com",
    messagingSenderId: "498744253919",
    appId: "1:498744253919:web:8c7d11f8a23c5439d0b86a"
  },
  theme: {
    palette: {
      type: 'dark',
      primary: {
        main: '#4f4f4f'
      },
      secondary: {
        main: '#ff8a65'
      }
    },
  }
};

export default config;