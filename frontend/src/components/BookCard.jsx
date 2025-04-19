import React from 'react';
import { useNavigate } from 'react-router-dom';

function BookCard({ book, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="border border-gray-300 rounded p-4 w-48">
      <h3 className="text-lg font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-600">{book.author}</p>
      <div className="mt-2 space-x-2">
        <button
          onClick={() => navigate(`/books/edit/${book._id}`)}
          className="bg-yellow-400 text-white px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(book._id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookCard;