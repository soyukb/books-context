import React, { useContext } from "react";
import BookShow from "./BookShow";
import BooksContext from "../context/books.js";

const BookList = ({ books, onDelete, onEdit }) => {
  const renderedBooks = books.map((book) => {
    return (
      <BookShow onEdit={onEdit} key={book.id} book={book} onDelete={onDelete} />
    );
  });
  return <div className="book-list">{renderedBooks}</div>;
};

export default BookList;
