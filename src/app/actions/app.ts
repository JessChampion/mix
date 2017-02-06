export const LOAD_STATE = 'LOAD_STATE';
export function loadState(store: any) {
  return {
    type: LOAD_STATE,
    store
  };
}
