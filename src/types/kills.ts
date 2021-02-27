import { OpaqueString, DateString } from './core';

export type KillVictim = OpaqueString<'KillVictim'>;

export interface IKill {
  killDate: DateString;
  victim: KillVictim;
}

export interface IKillDay {
  kind: 'kill-day';
  killDate: DateString;
  victims: KillVictim[];
}

export interface IKillFreeStreak {
  kind: 'kill-free-streak';
  date: DateString;
  streakLength: number;
}

export type KillsTimelineEntry = IKillDay | IKillFreeStreak;
