import { URI } from "./config";

const getBooksService = async () => {

  const response = await fetch(URI('books'));
  const result = await response.json();

  if (result.success) {
    return result.books;
  } else {
    return [];
  }

};

export {
  getBooksService,
};
