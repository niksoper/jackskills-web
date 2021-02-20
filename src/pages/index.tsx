import * as React from 'react';

import Shell from '../layout/shell';
import { IKill } from '../api/killsApi';

import './index.scss';

const Index: React.FunctionComponent<{}> = () => {
  const [kills, setKills] = React.useState<IKill[]>([]);

  React.useEffect(() => {
    fetch(`${process.env.API_BASE_URL}/kills`)
      .then((response) => response.json())
      .then((resultData) => setKills(resultData));
  }, []);

  return (
    <Shell>
      <div className="fixed-width">
        <pre>{JSON.stringify(kills, null, 2)}</pre>
      </div>
    </Shell>
  );
};

export default Index;
