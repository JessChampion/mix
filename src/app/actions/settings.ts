export const ADD_SEED = 'ADD_SEED';
export function addSeed(track: any) {
  return {
    type: ADD_SEED,
    track
  };
}

export const REMOVE_SEED = 'REMOVE_SEED';
export function removeSeed(id: any) {
  return {
    type: REMOVE_SEED,
    id
  };
}

export const LOADED_THUMBNAIL = 'LOADED_THUMBNAIL';
export function loadedThumbnail(id: number, imageUrl: any) {
  return {
    type: LOADED_THUMBNAIL,
    id,
    imageUrl
  };
}

export const CREATE_MIX = 'CREATE_MIX';
export function createMix() {
  return {
    type: CREATE_MIX
  };
}