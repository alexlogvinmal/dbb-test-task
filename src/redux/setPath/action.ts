const SET_PATH = 'SET_PATH';

export const setPath = (path:string) => {
  return {
    type: SET_PATH,
    payload: path,
  };
};