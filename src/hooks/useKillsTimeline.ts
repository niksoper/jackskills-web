import { parse, differenceInDays, addDays, format } from 'date-fns';
import * as React from 'react';
import { IKill, DateString, KillVictim } from '../api/killsApi';

export interface IKillDay {
  kind: 'kill-day';
  killDate: DateString;
  victims: KillVictim[];
}

export interface IKillFreeStreak {
  kind: 'kill-free-streak';
  startDate: DateString;
  streakLength: number;
}

export type KillsTimelineEntry = IKillDay | IKillFreeStreak;

export function useKillsTimeline(kills: IKill[]): KillsTimelineEntry[] {
  return React.useMemo<KillsTimelineEntry[]>(() => killsToTimeline(kills), [kills]);
}

const dateFormat = 'yyyy-MM-dd';
const formatDate = (date: Date) => format(date, dateFormat) as DateString;

export function killsToTimeline(kills: IKill[]): KillsTimelineEntry[] {
  const seed: KillsTimelineEntry[] = [];

  const killsWithDates = kills.map((k) => ({
    ...k,
    killDateObj: parse(k.killDate, dateFormat, new Date()),
  }));

  return killsWithDates.reduce((timeline, kill, i, allKills) => {
    const nextKill = i > 0 ? allKills[i - 1] : undefined;
    const daysBetweenKills = nextKill ? differenceInDays(nextKill.killDateObj, kill.killDateObj) : undefined;

    if (daysBetweenKills === 0) {
      const nextKillDay = timeline[timeline.length - 1] as IKillDay;
      nextKillDay.victims.push(kill.victim);
      return timeline;
    }

    if (daysBetweenKills > 1) {
      timeline.push({
        kind: 'kill-free-streak',
        startDate: formatDate(addDays(kill.killDateObj, 1)),
        streakLength: daysBetweenKills - 1,
      });
    }

    return [
      ...timeline,
      {
        kind: 'kill-day',
        killDate: kill.killDate,
        victims: [kill.victim],
      },
    ];
  }, seed);
}
