import React from 'react';

interface NoMatchProps {
}

const NoMatch: React.FC<NoMatchProps> = (props) => {
  return (
    <div>
      <h1>404</h1>
      Nothing here...move a long
    </div>
  );
};

export default NoMatch;