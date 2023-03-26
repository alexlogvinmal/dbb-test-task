import styles from './ShowContent.module.scss';
import { useState, forwardRef } from 'react';
import { Files } from '../../redux/fetchFiles/reducer';
import { Dropbox } from 'dropbox';
import moment from 'moment';
import FileSaver from 'file-saver';
import { API_KEY } from '../../const/api';
import { useAppDispatch } from '../../redux/hook';
import { generateIcon } from '../helpers/generateIcon';
import { addPathUrl } from '../../redux/pathUrl/action';
import { setPath } from '../../redux/setPath/action';
import { updateFiles } from '../../redux/updateFiles/action';
import { DialogContentText, TableCell, TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import { CopyIcon, DeleteIcon, DownloadIcon, MoreIcon, MoveIcon, SetNameIcon } from '../Icons/Icons';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';


interface FilesProps {
  file: Files
}

const ShowContent = ({ file }: FilesProps) => {
  const dispatch = useAppDispatch();
  const [anchorElMore, setAnchorElMore] = useState<null | HTMLElement>(null);
  const [renameNew, setRenameNew] = useState('');
  const [open, setOpen] = useState(false);
  const dbx = new Dropbox({
    accessToken: API_KEY,
    fetch
  })
  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [openAlert, setOpenAlert] = useState(false);
  const handleClickAlert = () => {
    setOpenAlert(true);
  };
  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const [openError, setOpenError] = useState(false);
  const handleClickError = () => {
    setOpenError(true);
  };
  const handleCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };


  function handleAddPath(path: string, name: string, tag: string) {
    if (tag === 'folder') {
      dispatch(setPath(path));
      dispatch(addPathUrl(path, name));
    } else {
      dbx.filesGetPreview({ path: path }).then((response: any) => {
        window.open(response.link, '_blank')
      })
    }
  }

  function downloadFile(path: string) {
    handleCloseMoreMenu();
    if(file['.tag']==='folder'){
      dbx.filesDownloadZip({ path: path }).then((response: any) => {
        FileSaver.saveAs(response.fileBlob, `${file.name}.zip`)
      }) 
    }else{
    dbx.filesGetTemporaryLink({ path: path }).then((response: any) => {
      window.open(response.link, '_blank')
    }) 
    }

  }

  async function deleteFile(path: string) {
    handleCloseMoreMenu();
    await dbx.filesDeleteV2({ path: path })
    dispatch(updateFiles());
  }

  function setTime(time: string) {
    if (time) {
      return moment(time).format('D/M/YYYY H:mm')
    } else {
      return '--'
    }
  }

  const handleOpenMoreMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMore(event.currentTarget);
  };
  const handleCloseMoreMenu = () => {
    setAnchorElMore(null);
  };

  const closeMenuWithMessage = () => {
    setAnchorElMore(null);
    handleClickAlert();
  }

  async function handleSubmit(e: any) {
    if (renameNew === '') {
      handleClickError();
    } else {
      handleClose();
      await dbx.filesMoveV2({
        from_path: file.path_lower,
        to_path: `/${renameNew}`
      })
      dispatch(updateFiles());
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
  });

  return (
    <>
      <TableRow className={styles.content} key={file.name}>
        <TableCell className={styles.contentsvg} sx={{ display: 'flex', alignItems: 'center' }} onClick={e => handleAddPath(file.path_lower, file.name, file['.tag'])}>{generateIcon(file['.tag'])}{file.name}</TableCell>
        <TableCell align={'center'}>{setTime(file.client_modified)}</TableCell>
        <TableCell align={'center'}>Only you</TableCell>
        <TableCell align={'center'}>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="More">
              <label onClick={handleOpenMoreMenu} className={styles.creater}><MoreIcon /></label>
            </Tooltip>
            <Menu
              sx={{ mt: '35px' }}
              id="menu-appbar"
              anchorEl={anchorElMore}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElMore)}
              onClose={handleCloseMoreMenu}
            >
              <MenuItem className={styles.menuitem} onClick={e => downloadFile(file.path_lower)}>
                <DownloadIcon />
                <Typography textAlign="center">Download</Typography>
              </MenuItem>
              <MenuItem className={styles.menuitem} onClick={closeMenuWithMessage}>
                <CopyIcon />
                <Typography textAlign="center">Copy</Typography>
              </MenuItem>
              <MenuItem className={styles.menuitem} onClick={handleClickOpen}>
                <SetNameIcon />
                <Typography textAlign="center">Rename</Typography>
              </MenuItem>
              <MenuItem className={styles.menuitem} onClick={closeMenuWithMessage}>
                <MoveIcon />
                <Typography textAlign="center">Move</Typography>
              </MenuItem>
              <MenuItem className={styles.menuitem} onClick={e => deleteFile(file.path_lower)}>
                <DeleteIcon />
                <Typography textAlign="center">Delete</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </TableCell>
      </TableRow>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{file.name}</DialogTitle>
        <DialogContent>
          <CssTextField
            autoFocus
            margin="dense"
            id="text"
            label="New Name"
            type="text"
            fullWidth
            variant="standard"
            value={renameNew}
            onChange={e => setRenameNew(e.target.value)}
          />
          <DialogContentText>
            <b>If it is not a Folder, please specify the file extension (.txt)</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: 'black' }} onClick={handleClose}>Cancel</Button>
          <Button sx={{ color: 'black' }} onClick={handleSubmit}>Rename</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="info" sx={{ width: '100%' }}>
          This feature will be added soon!
        </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          Error! New name is empty!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShowContent;
