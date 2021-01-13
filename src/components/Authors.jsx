import React, { useEffect, useRef, useState } from 'react';

import MaterialTable from 'material-table';
import { PersonAdd, Delete } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import { getAuthorsService } from '../services/getAuthorsService';

const Authors = () => {

  const [authorsList, setAuthorsList] = useState([]);

  useEffect(() => {
    (async () => {
      const authors = await getAuthorsService();
      setAuthorsList(authors);
    })();
  }, []);
  
  const columns = useRef([
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
  ]);

  const addAuthor = (author) => {}
  const updateAuthor = (oldAuthor, newAuthor) => {}
  const deleteAuthor = (author) => {}

  return (
    // <MaterialTable
    //   options={{
    //     actionsColumnIndex: 3,
    //     search: false,
    //     actionsCellStyle: {
    //       color: '#3e4095',
    //     },
    //   }}
    //   icons={{
    //     Add: props => <PersonAdd color='primary' {...props}/>,
    //     Delete: props => <Delete style={{ color: 'red' }} {...props}/>,
    //   }}
    //   title={
    //     <Typography style={{ fontSize: 20, color: '#fdd835' }}>Authors</Typography>
    //   }
    //   columns={columns.current}
    //   data={authorsList}
    //   editable={{
    //     onRowAdd: newData => addAuthor(newData), 
    //     onRowUpdate: (newData, oldData) =>
    //       updateAuthor(oldData, newData),
    //     onRowDelete: oldData =>
    //       deleteAuthor(oldData),
    //   }}
    // />
    <MaterialTable
      columns={[
        { title: 'Adı', field: 'name' },
        { title: 'Soyadı', field: 'surname' },
        { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
        { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
      ]}
      data={[{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 }]}
      title="Demo Title"
    />
  );

};

export default Authors;
