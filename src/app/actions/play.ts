export const RECIEVED_MIX = 'RECIEVED_MIX';
export function recievedMix(mix: any) {
  return {
    type: RECIEVED_MIX,
    mix
  };
}

export const PRUNE_MIX = 'PRUNE_MIX';
export function pruneMix(trackID: string) {
  return {
    type: PRUNE_MIX,
    trackID
  };
}