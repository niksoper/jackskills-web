import { parse } from 'date-fns';
import { DateString } from '../types/core';
import { IKill, KillsTimelineEntry, KillVictim } from '../types/kills';
import { killsToTimeline } from './useKillsTimeline';

const today = new Date();
const createDate = (date: string) => parse(date, 'yyyy-MM-dd', today);

describe('killsToTimeline', () => {
  it('given empty, returns empty', () => {
    expect(killsToTimeline([], today)).toEqual([]);
  });

  it('given one kill today, returns one kill-day', () => {
    const kills: IKill[] = [
      {
        killDate: '2021-01-01' as DateString,
        victim: 'Lion' as KillVictim,
      },
    ];

    const timeline = killsToTimeline(kills, createDate('1st Jan'));

    expect(timeline.length).toEqual(1);
    expect(timeline).toEqual<KillsTimelineEntry[]>([
      {
        kind: 'kill-day',
        killDate: '1st Jan' as DateString,
        victims: ['Lion' as KillVictim],
      },
    ]);
  });

  it('given one kill yesterday, returns one kill free day and one kill-day', () => {
    const kills: IKill[] = [
      {
        killDate: '2021-01-01' as DateString,
        victim: 'Lion' as KillVictim,
      },
    ];

    const timeline = killsToTimeline(kills, createDate('2021-01-02'));

    expect(timeline.length).toEqual(2);
    expect(timeline).toEqual<KillsTimelineEntry[]>([
      {
        kind: 'kill-free-streak',
        date: '2nd Jan' as DateString,
        streakLength: 1,
      },
      {
        kind: 'kill-day',
        killDate: '1st Jan' as DateString,
        victims: ['Lion' as KillVictim],
      },
    ]);
  });

  it('given one kill ten days ago, returns one kill free day and one kill-day', () => {
    const kills: IKill[] = [
      {
        killDate: '1st Jan' as DateString,
        victim: 'Lion' as KillVictim,
      },
    ];

    const timeline = killsToTimeline(kills, createDate('11th Jan'));

    expect(timeline.length).toEqual(2);
    expect(timeline).toEqual<KillsTimelineEntry[]>([
      {
        kind: 'kill-free-streak',
        date: '11th Jan' as DateString,
        streakLength: 10,
      },
      {
        kind: 'kill-day',
        killDate: '1st Jan' as DateString,
        victims: ['Lion' as KillVictim],
      },
    ]);
  });

  it('given two kills on consecutive days, returns two kill-days', () => {
    const kills: IKill[] = [
      {
        killDate: '2021-01-02' as DateString,
        victim: 'Bear' as KillVictim,
      },
      {
        killDate: '2021-01-01' as DateString,
        victim: 'Lion' as KillVictim,
      },
    ];

    const timeline = killsToTimeline(kills, createDate('2021-01-02'));

    expect(timeline.length).toEqual(2);
    expect(timeline).toEqual<KillsTimelineEntry[]>([
      {
        kind: 'kill-day',
        killDate: '2nd Jan' as DateString,
        victims: ['Bear' as KillVictim],
      },
      {
        kind: 'kill-day',
        killDate: '1st Jan' as DateString,
        victims: ['Lion' as KillVictim],
      },
    ]);
  });

  it('given two kills on the same day, returns one kill-day with two kills', () => {
    const kills: IKill[] = [
      {
        killDate: '2021-03-02' as DateString,
        victim: 'Bear' as KillVictim,
      },
      {
        killDate: '2021-03-02' as DateString,
        victim: 'Lion' as KillVictim,
      },
    ];

    const timeline = killsToTimeline(kills, createDate('2021-03-02'));

    expect(timeline.length).toEqual(1);
    expect(timeline).toEqual<KillsTimelineEntry[]>([
      {
        kind: 'kill-day',
        killDate: '2nd Mar' as DateString,
        victims: ['Bear' as KillVictim, 'Lion' as KillVictim],
      },
    ]);
  });

  it('given one day between kills, returns kill-free-streak between kill days', () => {
    const kills: IKill[] = [
      {
        killDate: '2021-03-04' as DateString,
        victim: 'Bear' as KillVictim,
      },
      {
        killDate: '2021-03-02' as DateString,
        victim: 'Lion' as KillVictim,
      },
    ];

    const timeline = killsToTimeline(kills, createDate('2021-03-04'));

    expect(timeline.length).toEqual(3);
    expect(timeline).toEqual<KillsTimelineEntry[]>([
      {
        kind: 'kill-day',
        killDate: '4th Mar' as DateString,
        victims: ['Bear' as KillVictim],
      },
      {
        kind: 'kill-free-streak',
        date: '3rd Mar' as DateString,
        streakLength: 1,
      },
      {
        kind: 'kill-day',
        killDate: '2nd Mar' as DateString,
        victims: ['Lion' as KillVictim],
      },
    ]);
  });

  it('given five days between kills, returns 5 day kill-free-streak between kill days', () => {
    const kills: IKill[] = [
      {
        killDate: '2021-04-06' as DateString,
        victim: 'Bear' as KillVictim,
      },
      {
        killDate: '2021-03-31' as DateString,
        victim: 'Lion' as KillVictim,
      },
    ];

    const timeline = killsToTimeline(kills, createDate('2021-04-06'));

    expect(timeline.length).toEqual(3);
    expect(timeline).toEqual<KillsTimelineEntry[]>([
      {
        kind: 'kill-day',
        killDate: '6th Apr' as DateString,
        victims: ['Bear' as KillVictim],
      },
      {
        kind: 'kill-free-streak',
        date: '5th Apr' as DateString,
        streakLength: 5,
      },
      {
        kind: 'kill-day',
        killDate: '31st Mar' as DateString,
        victims: ['Lion' as KillVictim],
      },
    ]);
  });
});
