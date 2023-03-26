interface RootState {
  path: string;
}

const initialState: RootState = {
  path: '',
};
  
  export const setPathReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_PATH':
          return {
            ...state,
            path: action.payload,
          };
        default:
          return state;
      }
  };