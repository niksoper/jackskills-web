import { parse, differenceInDays, addDays, format } from 'date-fns';
import * as React from 'react';
import { DateString } from '../types/core';
import { IKill, IKillDay, KillsTimelineEntry } from '../types/kills';

export function useKillsTimeline(kills: IKill[]): KillsTimelineEntry[] {
  return React.useMemo<KillsTimelineEntry[]>(() => killsToTimeline(kills, new Date()), [kills]);
}

const inputDateFormat = 'yyyy-MM-dd';
const formatDate = (date: Date) => format(date, 'do MMM') as DateString;

export function killsToTimeline(kills: IKill[], today: Date): KillsTimelineEntry[] {
  const seed: KillsTimelineEntry[] = [];

  const killsWithDates = kills.map((k) => {
    const killDateObj = parse(k.killDate, inputDateFormat, new Date());

    return {
      ...k,
      killDateObj,
      killDate: formatDate(killDateObj),
    };
  });

  return killsWithDates.reduce((timeline, kill, i, allKills) => {
    if (i === 0) {
      const daysSinceLastKill = differenceInDays(today, kill.killDateObj);
      if (daysSinceLastKill > 0) {
        timeline.push({
          kind: 'kill-free-streak',
          date: formatDate(today),
          streakLength: daysSinceLastKill,
        });
      }
    }

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
        date: formatDate(addDays(nextKill.killDateObj, -1)),
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
