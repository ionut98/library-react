import React, { useEffect, useMemo, useState, forwardRef, useContext } from 'react';

import MaterialTable from 'material-table';
import { PersonAdd, Delete, MenuBook } from '@material-ui/icons';
import { Typography, Grid, Button, CircularProgress } from '@material-ui/core';
import { getAuthorsService } from '../services/getAuthorsService';

import { Context } from '../context/ApplicationContext';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { addAuthorService } from '../services/addAuthor';
import { deleteAuthorService } from '../services/deleteAuthor';
import { updateAuthorService } from '../services/updateAuthor';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const Authors = () => {

  const context = useContext(Context);
  const {
    setView,
  } = context;
  const [authorsList, setAuthorsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      fetchAuthors();
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    })();
  }, []);

  const fetchAuthors = async () => {
    const authors = await getAuthorsService();
    setAuthorsList(authors);
  };
  
  const columns = useMemo(() => [
    { 
      title: 'ID', 
      field: 'id',
      editable: 'never',
      cellStyle: {
        width: '5%',
        textAlign: 'left',
        paddingLeft: 50,
      },
      headerStyle: {
        width: '5%',
        textAlign: 'left',
        paddingLeft: 50,
      },
    },
    { 
      title: 'First Name', 
      field: 'FirstName',
      cellStyle: {
        width: '40%',
        textAlign: 'left',
        paddingLeft: 10,
      },
      headerStyle: {
        width: '40%',
        textAlign: 'left',
        paddingLeft: 10,
      },
    },
    { 
      title: 'Last Name', 
      field: 'LastName',
      cellStyle: {
        width: '40%',
        textAlign: 'left',
        paddingLeft: 10,
      },
      headerStyle: {
        width: '40%',
        textAlign: 'left',
        paddingLeft: 10,
      },
    },
  ], []);

  const addAuthor = (author) =>
    new Promise(async (resolve, reject) => {
      
      const addResult = await addAuthorService({
        FirstName: author.FirstName,
        LastName: author.LastName,
      });
    
      if (addResult) {
        await fetchAuthors();
        return resolve();
      } else {
        return reject();
      }
    })

  const updateAuthor = (oldAuthor, newAuthor) => 
    new Promise(async (resolve, reject) => {
        
      const updateResult = await updateAuthorService({
        id: oldAuthor.id,
        FirstName: newAuthor.FirstName,
        LastName: newAuthor.LastName,
      });
    
      if (updateResult) {
        await fetchAuthors();
        return resolve();
      } else {
        return reject();
      }
    })
    
  const deleteAuthor = (author) =>
    new Promise( async (resolve, reject) => {

      const deleteResult = await deleteAuthorService({
        id: author.id,
      });

      if (deleteResult) {
        await fetchAuthors();
        return resolve();
      } else {
        return reject();
      }

    });

  return (
    !loading ?
    <>
      <Grid item xs={10}>
        <MaterialTable
          options={{
            actionsColumnIndex: 3,
            search: false,
            actionsCellStyle: {
              color: '#3e4095',
            },
          }}
          icons={{
            ...tableIcons,
            Add: props => <PersonAdd style={{ color: '#fdd835' }} {...props}/>,
            Delete: props => <Delete style={{ color: 'red' }} {...props}/>,
          }}
          title={
            <Typography style={{ fontSize: 20, color: '#fdd835' }}>Authors</Typography>
          }
          columns={columns}
          data={authorsList}
          editable={{
            onRowAdd: newData => addAuthor(newData), 
            onRowUpdate: (newData, oldData) =>
              updateAuthor(oldData, newData),
            onRowDelete: oldData =>
              deleteAuthor(oldData),
          }}
          />
      </Grid>
      <Grid item xs={3}>
        <Button
          fullWidth
          variant='outlined'
          startIcon={
            <MenuBook 
              style={{
                color: '#fdd835',
              }}
            />
          }
          style={{
            color: '#fff',
            borderColor: '#fff',
          }}
          onClick={() => setView('books')}
        >
          BOOKS
        </Button>
      </Grid>
    </>
    : <CircularProgress style={{ color: '#fdd835' }}/>
  );

};

export default Authors;
