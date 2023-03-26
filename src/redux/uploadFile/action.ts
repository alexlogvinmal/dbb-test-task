import { Dropbox } from 'dropbox';
import { API_KEY } from '../../const/api';

const dbx = new Dropbox({
    accessToken: API_KEY,
    fetch
  })
  
export const handleFileUpload = (files:any, path:string) => async (dispatch:any) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await dbx.filesUpload({ path: `${path}/${file.name}`, contents: file });
    }
  };
  