import { URI } from "./config";

const addAuthorService = async (newAuthor) => {

  const payload = JSON.stringify(newAuthor);

  const response = await fetch(URI('authors/add'), {
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
  addAuthorService,
};
