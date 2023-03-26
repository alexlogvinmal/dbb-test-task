import { Dispatch } from 'redux';
import { Dropbox } from 'dropbox';
import { API_KEY } from '../../const/api';


const dbx = new Dropbox({
  accessToken: API_KEY,
  fetch
})

enum FilesActionTypes {
  FETCH_FILES_REQUEST = 'FETCH_FILES_REQUEST',
  FETCH_FILES_SUCCESS = 'FETCH_FILES_SUCCESS',
  FETCH_FILES_FAILED = 'FETCH_FILES_FAILED',
}

export const fetchFilesRequest = () => ({
  type: FilesActionTypes.FETCH_FILES_REQUEST,
});

export const fetchFilesSuccess = (data: any) => ({
  type: FilesActionTypes.FETCH_FILES_SUCCESS,
  payload: data,
});

export const fetchFilesFailed = (error: string) => ({
  type: FilesActionTypes.FETCH_FILES_FAILED,
  payload: error,
});

export const fetchFiles = (path:string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchFilesRequest()); 
    try {
      const response = await dbx.filesListFolder({path: path});
      const data = await response.entries;
      dispatch(fetchFilesSuccess(data));
    } catch (error:any) {
      dispatch(fetchFilesFailed(error.message));
    }
  };
};