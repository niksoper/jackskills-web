import { IKill } from '../types/kills';

export async function getKills(action: (kills: IKill[]) => void): Promise<void> {
  const response = await fetch('http://localhost:8080/kills');
  const kills = (await response.json()) as IKill[];

  action(kills);
}
