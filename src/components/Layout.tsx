import React from 'react';
import {AppBar, Toolbar, Typography} from "@material-ui/core";

interface LayoutProps {
  children: any;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6">
            ComicBook Reader
          </Typography>
        </Toolbar>
      </AppBar>

      <div>
        {children}
      </div>
    </>
  );
};

export default Layout;