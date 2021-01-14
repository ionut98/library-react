import React, { useEffect, useMemo, useState, forwardRef, useContext } from 'react';

import MaterialTable, { MTableEditField } from 'material-table';
import { Delete, PermIdentity, NoteAdd } from '@material-ui/icons';
import { Typography, Grid, Button, CircularProgress, Dialog, DialogContent, DialogActions, List, ListItem, ListItemIcon, Checkbox, ListItemText } from '@material-ui/core';
import { getBooksService } from '../services/getBooksService';

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
import { getAuthorsService } from '../services/getAuthorsService';
import { addBookService } from '../services/addBook';
import { updateBookService } from '../services/updateBookService';
import { deleteBookService } from '../services/deleteBookService';

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

const Books = () => {

  const context = useContext(Context);
  const {
    setView,
  } = context;
  
  const [booksList, setBooksList] = useState([]);
  const [authorsList, setAuthorsList] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    const books = await getBooksService();
    setBooksList(books);
  };
    
  useEffect(() => {
    (async () => {

      await fetchBooks();

      const authors = await getAuthorsService();
      setAuthorsList(authors);

      setTimeout(() => {
        setLoading(false);
      }, 1500);

    })();
  }, []);

  const columns = useMemo(() => [
    { 
      title: 'ISBN', 
      field: 'ISBN',
      cellStyle: {
        width: '20%',
        textAlign: 'left',
        paddingLeft: 50,
      },
      headerStyle: {
        width: '20%',
        textAlign: 'left',
        paddingLeft: 50,
      },
    },
    { 
      title: 'Title', 
      field: 'Title',
      cellStyle: {
        width: '20%',
        textAlign: 'left',
        paddingLeft: 10,
      },
      headerStyle: {
        width: '20%',
        textAlign: 'left',
        paddingLeft: 10,
      },
    },
    { 
      title: 'Nr of Pages', 
      field: 'NrOfPages',
      cellStyle: {
        width: '20%',
        textAlign: 'left',
        paddingLeft: 10,
      },
      headerStyle: {
        width: '20%',
        textAlign: 'left',
        paddingLeft: 10,
      },
      type: 'numeric',
    },
    { 
      title: 'Type', 
      field: 'Type',
      cellStyle: {
        width: '20%',
        textAlign: 'left',
        paddingLeft: 10,
      },
      headerStyle: {
        width: '20%',
        textAlign: 'left',
        paddingLeft: 10,
      },
    },
    { 
      title: 'Descriptions', 
      field: 'Description',
      cellStyle: {
        width: '20%',
        textAlign: 'left',
        paddingLeft: 10,
      },
      headerStyle: {
        width: '20%',
        textAlign: 'left',
        paddingLeft: 10,
      },
    },
    {
      title: 'Authors',
      field: 'Authors',
      render: rowData => (rowData.Authors.map((author) => author.FirstName[0] + ' ' + author.LastName)).join(','), // to display authors Last Name 
      lookup: {},
    },
  ], []);

  const addBook = (book) =>
    new Promise(async (resolve, reject) => {
      
      if (booksList.map(book => book.ISBN).includes(book.ISBN)) {
        return reject();
      }
      
      book.Authors = selectedAuthorsIds; //set the selected authors
      const addResult = await addBookService({
        book: {
          ISBN: book.ISBN,
          Title: book.Title,
          NrOfPages: book.NrOfPages,
          Type: book.Type,
          Description: book.Description,
        },
        authors: book.Authors,
      });
      
      if (addResult) {
        await fetchBooks();
        setChangeAuthorsIntention(false);
        return resolve();
      } else {
        return reject();
      }

    });
  
  const updateBook = (oldBook, newBook) =>
    new Promise(async (resolve, reject) => {

      if (newBook.ISBN !== oldBook.ISBN && booksList.map(book => book.ISBN).includes(newBook.ISBN)) {
        return reject();
      }
    
      const updateResult = await updateBookService(
        {
          ISBN: newBook.ISBN,
          book: {
            ISBN: newBook.ISBN,
            Title: newBook.Title,
            NrOfPages: newBook.NrOfPages,
            Type: newBook.Type,
            Description: newBook.Description,
          },
          authors:
            changeAuthorsIntention ? selectedAuthorsIds : oldBook.Authors.map(author => author.id),
        }
      );

      if (updateResult) {
        await fetchBooks();
        setChangeAuthorsIntention(false);
        return resolve();
      } else {
        return reject();
      }
      
    });
  
  const deleteBook = (book) =>
    new Promise(async (resolve, reject) => {
      
      const deleteResult = await deleteBookService(
        {
          ISBN: book.ISBN,
        }
      );

      if (deleteResult) {
        await fetchBooks();
        return resolve();
      } else {
        return reject();
      }
    });

  const [openAuthorsDialog, setOpenAuthorsDialog] = useState(false);
  const [selectedAuthorsIds, setSelectedAuthorsIds] = useState([]);
  
  const handleCheckAuthor = (authorId) => () => {
    const currentIndex = selectedAuthorsIds.indexOf(authorId);
    const newChecked = [...selectedAuthorsIds];

    if (currentIndex === -1) {
      newChecked.push(authorId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedAuthorsIds(newChecked);
  };

  const [changeAuthorsIntention, setChangeAuthorsIntention] = useState(false);

  return (
    <>
      {
      !loading ?
        <>
          <Grid item xs={10}>
            <MaterialTable
              components={{
                EditField: fieldProps => {
                  const {
                    columnDef: {
                      lookup
                    },
                    rowData: {
                      Authors,
                    },
                  } = fieldProps
                  if (lookup) {
                    return <Button
                      onClick={() => {
                        setChangeAuthorsIntention(true);
                        setOpenAuthorsDialog(true);
                        setSelectedAuthorsIds(Authors ? Authors.map(author => author.id) : []);
                      }}>
                      Authors
                    </Button>
                  } else {
                    return <MTableEditField {...{ ...fieldProps, value: fieldProps.value || '' }} />
                  }
                }
              }}
              options={{
                actionsColumnIndex: 6,
                search: false,
                actionsCellStyle: {
                  color: '#3e4095',
                },
              }}
              icons={{
                ...tableIcons,
                Add: props => <NoteAdd color='primary' {...props}/>,
                Delete: props => <Delete style={{ color: 'red' }} {...props}/>,
              }}
              title={
                <Typography style={{ fontSize: 20, color: '#fdd835' }}>Books</Typography>
              }
              columns={columns}
              data={booksList}
              editable={{
                onRowAdd: newData => addBook(newData), 
                onRowUpdate: (newData, oldData) =>
                  updateBook(oldData, newData),
                onRowDelete: oldData =>
                  deleteBook(oldData),
                onRowUpdateCancelled: () => setChangeAuthorsIntention(false),
                onRowAddCancelled: () => setChangeAuthorsIntention(false),
              }}
              />
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              variant='outlined'
              startIcon={
                <PermIdentity 
                  style={{
                    color: '#fdd835',
                  }}
                />
              }
              style={{
                color: '#fff',
                borderColor: '#fff',
              }}
              onClick={() => setView('authors')}
            >
              AUTHORS
            </Button>
          </Grid>
        </>
        : <CircularProgress style={{ color: '#fdd835' }} />
    }
    <Dialog open={openAuthorsDialog}>
      <DialogContent>
        <List>
          {authorsList.map((author, index) => {
            return (
              <ListItem key={index} dense button onClick={handleCheckAuthor(author.id)}>
                <ListItemIcon>
                  <Checkbox
                    edge='start'
                    checked={selectedAuthorsIds.indexOf(author.id) !== -1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={`${author.FirstName} ${author.LastName}`} />
              </ListItem>
            );
          })}
        </List>    
      </DialogContent>
      <DialogActions>
        <Button fullWidth onClick={() => setOpenAuthorsDialog(false)}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  </>
  );

};

export default Books;
