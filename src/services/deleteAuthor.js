import { URI } from "./config";

const deleteAuthorService = async (authorId) => {

  const payload = JSON.stringify(authorId);

  const response = await fetch(URI('authors/delete'), {
    method: 'DELETE',
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
  deleteAuthorService,
};
