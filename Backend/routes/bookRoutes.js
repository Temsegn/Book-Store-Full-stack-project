import express from "express";
import Book from "../model/book_model.js"; // Adjust path as necessary

const router = express.Router();

 
// Create a new book
router.post("/", async (req, res, next) => {
  try {
    const { title, author, publishYear } = req.body;

    // Validate inputs
    if (!title || !author || !publishYear) {
      return res.status(400).json({ error: "Title, author, and publishYear are required" });
    }
    if (typeof publishYear !== "number" || publishYear < 1000 || publishYear > new Date().getFullYear()) {
      return res.status(400).json({ error: "Invalid publishYear" });
    }

    const newBook = new Book({
      title,
      author,
      publishYear,
    });

    const savedBook = await newBook.save();
    console.log("Book created:", savedBook);
    res.status(201).json(savedBook);
  } catch (error) {
    console.error("Failed to create book:", error.message);
    next(error); // Propagate to global error middleware
  }
});

// Get all books
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find();
    console.log("Fetched books:", books.length);
    res.status(200).json(books); // Fixed: Return books array
  } catch (error) {
    console.error("Failed to fetch books:", error.message);
    next(error);
  }
});

// Update a book
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, author, publishYear } = req.body;

    // Validate inputs
    if (!title || !author || !publishYear) {
      return res.status(400).json({ error: "Title, author, and publishYear are required" });
    }
    if (typeof publishYear !== "number" || publishYear < 1000 || publishYear > new Date().getFullYear()) {
      return res.status(400).json({ error: "Invalid publishYear" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, publishYear },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    console.log("Book updated:", updatedBook);
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Failed to update book:", error.message);
    next(error);
  }
});

// Delete a book
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    console.log("Book deleted:", deletedBook);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Failed to delete book:", error.message);
    next(error);
  }
});

export default router;