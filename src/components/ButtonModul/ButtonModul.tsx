import styles from './ButtonModul.module.scss';
import { useState, forwardRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { handleFileUpload } from '../../redux/uploadFile/action';
import { createFolder } from '../../redux/createFolder/action';
import { updateFiles } from '../../redux/updateFiles/action';
import { UploadIcon, PlusIcon, AngelDownIcon, MoreIcon, MultiFolderIcon, CogIcon, Folder2Icon, SharedFolderIcon, ScreenRecordIcon, SetNameIcon, ShowIcon, RequestFileIcon, RewindIcon } from '../Icons/Icons';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const ButtonModul = () => {

  const path = useAppSelector(state => state.setPathReducer.path);
  const [folderName, setFolderName] = useState('');
  const dispatch = useAppDispatch();
  const [anchorElCreate, setAnchorElCreate] = useState<null | HTMLElement>(null);
  const [anchorElOrganise, setAnchorElOrganise] = useState<null | HTMLElement>(null);
  const [anchorElMore, setAnchorElMore] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
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

  const handleOpenCreateMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCreate(event.currentTarget);
  };
  const handleCloseCreateMenu = () => {
    setAnchorElCreate(null);
  };

  const handleOpenOrganiseMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElOrganise(event.currentTarget);
  };
  const handleCloseOrganiseMenu = () => {
    setAnchorElOrganise(null);
  };

  const handleOpenMoreMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMore(event.currentTarget);
  };
  const handleCloseMoreMenu = () => {
    setAnchorElMore(null);
  };



  async function handleSubmit(e: any) {
    if (folderName === '') {
      handleClickError();
    } else {
      handleClose();
      await dispatch(createFolder(folderName, path))
      dispatch(updateFiles());
    }
  }

  async function createFiles(files: any) {
    await dispatch(handleFileUpload(files, path));
    dispatch(updateFiles());
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function clickFolder(e: any) {
    handleCloseCreateMenu();
    handleClickOpen();
  }

  function alertCreateMenu(e: any) {
    handleCloseCreateMenu();
    handleClickAlert();
  }

  function alertOrganiseMenu(e: any) {
    handleCloseOrganiseMenu();
    handleClickAlert();
  }

  function alertMoreMenu(e: any) {
    handleCloseMoreMenu();
    handleClickAlert();
  }
  function rewindFromMoreMenu(e: any) {
    handleCloseMoreMenu();
    dispatch(updateFiles());
  }


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
      <div className={styles.forbttn}>
        <label htmlFor="filePicker" className={styles.filepicker}><UploadIcon />Upload</label>
        <input id="filePicker" className={styles.filepicker_input} type='file' multiple onChange={(e) => e.target.files && createFiles(e.target.files)} />
        <Box sx={{ flexGrow: 0 }}>
          <label onClick={handleOpenCreateMenu} className={styles.creater}><PlusIcon />Create<AngelDownIcon /></label>
          <Menu
            sx={{ mt: '35px' }}
            id="menu-appbar"
            anchorEl={anchorElCreate}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElCreate)}
            onClose={handleCloseCreateMenu}
          >
            <MenuItem className={styles.menuitem} onClick={clickFolder}>
              <Folder2Icon />
              <Typography textAlign="center">Folder</Typography>
            </MenuItem>
            <MenuItem className={styles.menuitem} onClick={alertCreateMenu}>
              <SharedFolderIcon />
              <Typography textAlign="center">Shared folder</Typography>
            </MenuItem>
            <MenuItem className={styles.menuitem} onClick={alertCreateMenu}>
              <CogIcon />
              <Typography textAlign="center">Automated folder</Typography>
            </MenuItem>
            <MenuItem className={styles.menuitem} onClick={alertCreateMenu}>
              <ScreenRecordIcon />
              <Typography textAlign="center">Screen recording</Typography>
            </MenuItem>
          </Menu>
        </Box>
        <div className={styles.line}></div>
        <Box sx={{ flexGrow: 0 }}>
          <label onClick={handleOpenOrganiseMenu} className={styles.creater}><MultiFolderIcon />Organise<AngelDownIcon /></label>
          <Menu
            sx={{ mt: '35px' }}
            id="menu-appbar"
            anchorEl={anchorElOrganise}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElOrganise)}
            onClose={handleCloseOrganiseMenu}
          >
            <MenuItem className={styles.menuitem} onClick={alertOrganiseMenu}>
              <MultiFolderIcon />
              <Typography textAlign="center">Multi-file organise</Typography>
            </MenuItem>
            <MenuItem className={styles.menuitem} onClick={alertOrganiseMenu}>
              <SetNameIcon />
              <Typography textAlign="center">Set naming convention</Typography>
            </MenuItem>
            <MenuItem className={styles.menuitem} onClick={alertOrganiseMenu}>
              <CogIcon />
              <Typography textAlign="center">Add automation</Typography>
            </MenuItem>
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <label onClick={handleOpenMoreMenu} className={styles.creater}><MoreIcon /></label>
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
            <MenuItem className={styles.menuitem} onClick={alertMoreMenu}>
              <ShowIcon />
              <Typography textAlign="center">Show deleted files</Typography>
            </MenuItem>
            <MenuItem className={styles.menuitem} onClick={alertMoreMenu}>
              <RequestFileIcon />
              <Typography textAlign="center">Request files</Typography>
            </MenuItem>
            <MenuItem className={styles.menuitem} onClick={rewindFromMoreMenu}>
              <RewindIcon />
              <Typography textAlign="center">Rewind this folder</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Folder</DialogTitle>
        <DialogContent>
          <CssTextField
            autoFocus
            margin="dense"
            id="text"
            label="Name Folder"
            type="text"
            fullWidth
            variant="standard"
            value={folderName}
            onChange={e => setFolderName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: 'black' }} onClick={handleClose}>Cancel</Button>
          <Button sx={{ color: 'black' }} onClick={handleSubmit}>Create Folder</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="info" sx={{ width: '100%' }}>
          This feature will be added soon!
        </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          Error! Name of folder is empty!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ButtonModul;
