export const addPathUrl = (path: string, name: string) => ({
    type: 'ADD_PATHURL',
    path,
    name,
  });
  export const delPathUrl = (length: number) => ({
    type: 'DEL_PATHURL',
    length,
  });
