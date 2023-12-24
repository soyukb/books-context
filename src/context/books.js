import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

const Provider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3001/books");
    setBooks(response.data);
  };
  const editBookById = async (id, newTitle) => {
    const response = await axios.put("http://localhost:3001/books/" + id, {
      title: newTitle,
    });

    const updatedBook = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }
      return book;
    });
    setBooks(updatedBook);
  };

  const createBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", {
      title,
    });

    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    await axios.delete("http://localhost:3001/books/" + id);

    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(updatedBooks);
  };

  const value = {
    books,
    fetchBooks,
    editBookById,
    createBook,
    deleteBookById,
  };

  return (
    <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
  );
};

export default BooksContext;
export { Provider };
