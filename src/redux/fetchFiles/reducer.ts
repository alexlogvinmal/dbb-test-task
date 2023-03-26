export interface Files {
    id: string,
    ['.tag']: string,
    name: string,
    path_display: string,
    path_lower:string,
    client_modified:string
  }
 export interface FilesState {
    files: Files[];
    loading: boolean;
    error: string | null;
  }
  
   enum FilesActionTypes {
    FETCH_FILES_REQUEST = 'FETCH_FILES_REQUEST',
    FETCH_FILES_SUCCESS = 'FETCH_FILES_SUCCESS',
    FETCH_FILES_FAILED = 'FETCH_FILES_FAILED',
  }

const initialState: FilesState = {
    files: [],
    loading: false,
    error: null,
  };
  
  export const fetchReducer = (state = initialState, action: any): FilesState => {
    switch (action.type) {
      case FilesActionTypes.FETCH_FILES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FilesActionTypes.FETCH_FILES_SUCCESS:
        return {
          ...state,
          loading: false,
          files: action.payload,
        };
      case FilesActionTypes.FETCH_FILES_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };