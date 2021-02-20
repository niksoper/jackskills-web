type OpaqueString<Key extends string> = string & { __opaque: Key };
export type DateString = OpaqueString<'DateString'>;
export type KillVictim = OpaqueString<'KillVictim'>;

export interface IKill {
  killDate: DateString;
  victim: KillVictim;
}

export async function getKills(action: (kills: IKill[]) => void): Promise<void> {
  const response = await fetch('http://localhost:8080/kills');
  const kills = (await response.json()) as IKill[];

  action(kills);
}
