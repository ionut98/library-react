import { URI } from "./config";

const updateBookService = async (newBook) => {

  const payload = JSON.stringify(newBook);

  const response = await fetch(URI('books/update'), {
    method: 'PUT',
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
  updateBookService,
};
