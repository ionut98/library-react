import { URI } from "./config";

const updateAuthorService = async (updatedAuthor) => {

  const payload = JSON.stringify(updatedAuthor);

  const response = await fetch(URI('authors/update'), {
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
  updateAuthorService,
};
