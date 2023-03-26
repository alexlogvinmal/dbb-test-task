

const initialState = {
  update: false,
};

export const updateFilesReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_UPDATE':
          return {
            ...state,
            update: !state.update,
          };
        default:
          return state;
      }
  };