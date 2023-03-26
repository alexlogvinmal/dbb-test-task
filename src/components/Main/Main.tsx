import styles from './Main.module.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { fetchFiles } from '../../redux/fetchFiles/action';
import { FilesState } from '../../redux/fetchFiles/reducer';
import { delPathUrl } from '../../redux/pathUrl/action';
import { setPath } from '../../redux/setPath/action';
import ButtonModul from '../ButtonModul/ButtonModul';
import ShowContent from '../ShowContent/ShowContent';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';


const Main = () => {
  const update = useAppSelector(state => state.updateFilesReducer.update);
  const filesState: FilesState = useAppSelector(state => state.fetchReducer);
  const files = filesState.files;
  const url = useAppSelector(state => state.pathUrlReducer)
  const path = useAppSelector(state => state.setPathReducer.path);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFiles(path));
  }, [path, update]);



  function handleDelPath(path: string) {
    dispatch(setPath(path));
    dispatch(delPathUrl(path.length));
  }


  return (
    <Paper style={{ minHeight: 600, width: '900px', marginTop: '1rem', marginBottom: '1rem' }}>
      <div className={styles.url}>
        {url.map((el) => (
          <p onClick={e => handleDelPath(el.path)} key={el.path}>{el.name.toUpperCase()} /</p>
        ))}
      </div>
      <ButtonModul />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              variant="head"
              align={'center'}
              style={{ width: 300 }}
              sx={{
                backgroundColor: 'background.paper',
              }}
            >
              Name
            </TableCell>
            <TableCell
              variant="head"
              align={'center'}
              style={{ width: 300 }}
              sx={{
                backgroundColor: 'background.paper',
              }}
            >
              Modified
            </TableCell>
            <TableCell
              variant="head"
              align={'center'}
              style={{ width: 250 }}
              sx={{
                backgroundColor: 'background.paper',
              }}
            >
              Who can access
            </TableCell>
            <TableCell
              variant="head"
              align={'center'}
              style={{ width: 50 }}
              sx={{
                backgroundColor: 'background.paper',
              }}
            >
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map(file => <ShowContent file={file} key={file.name} />)}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Main;
