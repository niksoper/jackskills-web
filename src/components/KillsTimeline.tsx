import * as React from 'react';

import { useKillsTimeline } from '../hooks/useKillsTimeline';
import { IKill } from '../types/kills';
import { KillDay, KillFreeStreak } from './KillsTimelineEvents';

import './KillsTimeline.scss';

export interface IKillsTimelineProps {
  kills: IKill[];
}

export const KillsTimeline: React.FunctionComponent<IKillsTimelineProps> = ({ kills }) => {
  const timeline = useKillsTimeline(kills);
  return (
    <div className="timeline-wrapper">
      <div className="timeline">
        {timeline.map((event) => {
          switch (event.kind) {
            case 'kill-day':
              return <KillDay key={event.killDate} killDay={event} />;
            case 'kill-free-streak':
              return <KillFreeStreak key={event.date} streak={event} />;
            default:
              const whoops: never = event;
          }
        })}
      </div>
    </div>
  );
};
