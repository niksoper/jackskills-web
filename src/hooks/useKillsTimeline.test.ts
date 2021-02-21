import { parse } from 'date-fns';
import { DateString, IKill, KillVictim } from '../api/killsApi';
import { KillsTimelineEntry, killsToTimeline } from './useKillsTimeline';

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

    const timeline = killsToTimeline(kills, createDate('2021-01-01'));

    expect(timeline.length).toEqual(1);
    expect(timeline).toEqual<KillsTimelineEntry[]>([
      {
        kind: 'kill-day',
        killDate: '2021-01-01' as DateString,
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
        startDate: '2021-01-02' as DateString,
        streakLength: 1,
      },
      {
        kind: 'kill-day',
        killDate: '2021-01-01' as DateString,
        victims: ['Lion' as KillVictim],
      },
    ]);
  });

  it('given one kill ten days ago, returns one kill free day and one kill-day', () => {
    const kills: IKill[] = [
      {
        killDate: '2021-01-01' as DateString,
        victim: 'Lion' as KillVictim,
      },
    ];

    const timeline = killsToTimeline(kills, createDate('2021-01-11'));

    expect(timeline.length).toEqual(2);
    expect(timeline).toEqual<KillsTimelineEntry[]>([
      {
        kind: 'kill-free-streak',
        startDate: '2021-01-02' as DateString,
        streakLength: 10,
      },
      {
        kind: 'kill-day',
        killDate: '2021-01-01' as DateString,
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
        killDate: '2021-01-02' as DateString,
        victims: ['Bear' as KillVictim],
      },
      {
        kind: 'kill-day',
        killDate: '2021-01-01' as DateString,
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
        killDate: '2021-03-02' as DateString,
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
        killDate: '2021-03-04' as DateString,
        victims: ['Bear' as KillVictim],
      },
      {
        kind: 'kill-free-streak',
        startDate: '2021-03-03' as DateString,
        streakLength: 1,
      },
      {
        kind: 'kill-day',
        killDate: '2021-03-02' as DateString,
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
        killDate: '2021-04-06' as DateString,
        victims: ['Bear' as KillVictim],
      },
      {
        kind: 'kill-free-streak',
        startDate: '2021-04-01' as DateString,
        streakLength: 5,
      },
      {
        kind: 'kill-day',
        killDate: '2021-03-31' as DateString,
        victims: ['Lion' as KillVictim],
      },
    ]);
  });
});
