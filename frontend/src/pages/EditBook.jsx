import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/books/${id}`).then((res) => {
      setTitle(res.data.title);
      setAuthor(res.data.author);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/books/${id}`, { title, author });
      toast.success('Book updated');
      navigate('/books');
    } catch {
      toast.error('Failed to update book');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8">
      <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
      />
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>
  );
}

export default EditBook;