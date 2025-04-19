
// pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Home() {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/books');
      setAllBooks(res.data);
      setFilteredBooks(res.data);
    } catch (error) {
      toast.error('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/books/${id}`);
      toast.success('Book deleted');
      fetchBooks();
    } catch {
      toast.error('Failed to delete book');
    }
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);
    const filtered = allBooks.filter((book) =>
      book.title.toLowerCase().includes(keyword)
    );
    setFilteredBooks(filtered);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Books</h2>
        <button
          onClick={() => navigate('/books/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Book
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={handleSearch}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
      />

      {loading ? (
        <p className="text-gray-500">Loading books...</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;