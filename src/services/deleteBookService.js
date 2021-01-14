import { URI } from "./config";

const deleteBookService = async (ISBN) => {

  const response = await fetch(URI('books/delete'), {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ISBN),
  });

  const result = await response.json();

  return Boolean(result.success);

};

export {
  deleteBookService,
};
