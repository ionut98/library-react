import { URI } from "./config";

export default async () => {

  const response = await fetch(URI('authors'));
  const result = await response.json();

  if (result.success) {
    return result.authors;
  } else {
    return [];
  }

};