import { URI } from "./config";

const addBookService = async (newBook) => {

  const payload = JSON.stringify(newBook);

  const response = await fetch(URI('books/add'), {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: payload,
  });
  const result = await response.json();

  return Boolean(result.success);

};

export {
  addBookService,
};
