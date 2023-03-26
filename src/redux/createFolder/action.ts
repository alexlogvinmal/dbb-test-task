import { Dropbox } from 'dropbox';
import { API_KEY } from '../../const/api';

const dbx = new Dropbox({
    accessToken: API_KEY,
    fetch
  })
  
export const createFolder = (name:string, path:string) => async (dispatch:any) => {
    await dbx.filesCreateFolderV2({ path: `${path}/` + name });
  };
  