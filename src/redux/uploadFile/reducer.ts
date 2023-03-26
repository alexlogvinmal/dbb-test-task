
  const initialState = {
    files: [],
  };
  
  export const uploadReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case 'UPLOAD_FILE':
        return {
          ...state,
          files: [...state.files, action.payload]
        };
      default:
        return state;
    }
  };
 