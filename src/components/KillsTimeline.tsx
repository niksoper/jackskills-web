import * as React from 'react';
import { IKill } from '../api/killsApi';
import { useKillsTimeline } from '../hooks/useKillsTimeline';

export interface IKillsTimelineProps {
  kills: IKill[];
}

export const KillsTimeline: React.FunctionComponent<IKillsTimelineProps> = ({ kills }) => {
  const timeline = useKillsTimeline(kills);
  return <pre>{JSON.stringify(timeline, null, 2)}</pre>;
};
