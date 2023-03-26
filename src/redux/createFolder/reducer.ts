const initialState = {
    name: '',
  };
  
  export const createFolderReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case 'UPLOAD_FILE':
        return {
          ...state,
          name: [action.payload]
        };
      default:
        return state;
    }
  };
 