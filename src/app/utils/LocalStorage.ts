import * as R from 'ramda';

export const STORE_KEY = 'MIX_STORAGE';

function loadFromLocalStorage(key: string) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.log(JSON.stringify(e));
  }
  return null;
}

function saveToLocalStorage(key: string, value: any) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}

const doParse = (str) => {
  console.log('PARSE: ' + str);
  return JSON.parse(str);
}
const doStringify = (json) => {
  console.log('STRINGIFY: ' + json);
  return JSON.stringify(json);
}

const loadAndParse = R.compose(doParse, loadFromLocalStorage);

export function loadStateFromStore(){
  return loadAndParse(STORE_KEY);
}

const stringifyAndSave = R.pipe(doStringify, R.curry(saveToLocalStorage)(STORE_KEY));
export function saveStateToStore(value: any){
  stringifyAndSave(value);
};
