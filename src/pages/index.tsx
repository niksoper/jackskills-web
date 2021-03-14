import * as React from 'react';

import Shell from '../layout/shell';

import './index.scss';

const Index: React.FunctionComponent<{}> = () => {
  return (
    <Shell siteKind="skills">
      <div className="fixed-width">
        <h1>My name is Jack Soper and I am wunderfol</h1>
      </div>
    </Shell>
  );
};

export default Index;
