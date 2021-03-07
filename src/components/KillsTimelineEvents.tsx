import * as React from 'react';

import { DateString } from '../types/core';
import { IKillDay, IKillFreeStreak, KillsTimelineEntry, KillVictim } from '../types/kills';

import './KillsTimelineEvents.scss';

export interface ITimelineDateProps {
  date: DateString;
}

export const TimelineDate: React.FunctionComponent<ITimelineDateProps> = ({ date }) => {
  return <h1 className="timeline-date">{date}</h1>;
};

export interface IKillDayProps {
  killDay: IKillDay;
}

export const KillDay: React.FunctionComponent<IKillDayProps> = ({ killDay: { killDate, victims } }) => {
  const getMessage = React.useCallback((victim: KillVictim) => {
    const verbs = ['smashed', 'obliterated', 'ended', 'wasted', 'stopped', 'destroyed'];
    const verb = verbs[Math.floor(Math.random() * verbs.length)];

    return victim === 'Unidentified' ? `I ${verb} it so good yoo cant work out wot it wus` : `I ${verb} a ${victim}`;
  }, []);

  return (
    <div className="kill-day">
      <div className="kill-icon-wrapper">
        <div className="kill-icon">💀</div>
      </div>
      <div className="kill-detail">
        <TimelineDate date={killDate} />
        <ul>
          {victims.map((victim, i) => (
            <li key={i}>{getMessage(victim)}</li>
          ))}
        </ul>
        {victims.length > 1 && <div className="badge">multi-kill</div>}
      </div>
    </div>
  );
};

export interface IKillFreeStreakProps {
  streak: IKillFreeStreak;
  showDate?: boolean;
}

export const KillFreeStreak: React.FunctionComponent<IKillFreeStreakProps> = ({
  showDate,
  streak: { date, streakLength },
}) => {
  const daysMessage = React.useMemo(() => {
    const days = streakLength === 1 ? 'day' : 'days';
    return `${streakLength} ${days}`;
  }, [streakLength]);

  const fontSizeClass = React.useMemo(() => {
    if (streakLength < 3) {
      return 'xsmall';
    }

    if (streakLength < 5) {
      return 'small';
    }

    if (streakLength < 8) {
      return 'medium';
    }

    if (streakLength < 13) {
      return 'large';
    }

    if (streakLength < 21) {
      return 'xlarge';
    }

    return 'xxlarge';
  }, [streakLength]);

  return (
    <div className={`kill-free-streak ${fontSizeClass}`}>
      {!!showDate && <TimelineDate date={date} />}
      <div className="message">
        <span className="been">It's been</span>
        <span className="streak-length">{daysMessage}</span>
      </div>
    </div>
  );
};
