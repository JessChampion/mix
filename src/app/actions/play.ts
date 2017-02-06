export const RECIEVED_MIX = 'RECIEVED_MIX';
export function recievedMix(mix: any) {
  return {
    type: RECIEVED_MIX,
    mix
  };
}