import { URI } from "./config";

const getAuthorsService = async () => {

  const response = await fetch(URI('authors'));
  const result = await response.json();

  if (result.success) {
    return result.authors;
  } else {
    return [];
  }

};

export {
  getAuthorsService,
};
