import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// Get the Google Books API key from the environment variables
const booksApiKey = process.env.BOOKS_API_KEY;
const API_URL = `https://www.googleapis.com/books/v1/volumes?q=subject:"philosophy"&langRestrict=es&maxResults=30&key=${booksApiKey}`;

// Get the current file path and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an Express app instance
const app = express();
const port = 3000;

// Parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Set the views directory for rendering templates
app.set("views", path.join(__dirname, "../views"));
console.log(path.join(__dirname, "../views"));

// Serve static files from the 'dist/public' directory
app.use(express.static(path.join(__dirname, "../../dist/public")));

// Route handler for the root URL
app.get("/", async (req, res) => {
  try {
    const result = await axios.get(API_URL);
    const rawBooks = result.data.items;

    // Map over the raw book data to create a cleaned-up array of book objects
    const books = rawBooks.map((book) => {
      const {
        volumeInfo: { title, subtitle, authors, description, imageLinks },
      } = book;

      // Use a placeholder thumbnail if no thumbnail is available
      const thumbnail = imageLinks?.thumbnail || "Imagen no disponible";

      // Use default values if they are not available
      const writers = authors ?? "Autores no disponibles";
      const subTitle = subtitle ?? "Subtítulo no disponible";
      const descriptionText = description ?? "Descripción no disponible";

      // Return a cleaned-up book object
      return {
        title,
        authors: writers,
        description: descriptionText,
        thumbnail,
        subtitle: subTitle,
      };
    });
    const currentRoute = req.path;

    // Render the 'index.ejs' view
    res.render("index.ejs", {
      content: books,
      showHeading: true,
      currentPage: currentRoute,
    });
  } catch (error) {
    // Log any errors to the console
    console.error("Error:", error);
  }
});

app.get("/bookview", (req, res) => {
  const bookData = req.query.book; // Get the book data from the query parameter
  const bookContent = JSON.parse(bookData);
  const currentRoute = req.path;
  res.render("bookview.ejs", {
    book: bookContent,
    showHeading: false,
    currentPage: currentRoute,
  }); // Pass the book data to the view
});

app.get("/filosofos", (req, res) => {
  const currentRoute = req.path;
  res.render("philosophers.ejs", {
    showHeading: false,
    currentPage: currentRoute,
  });
});

// Route handler for the nosotros page
app.get("/nosotros", (req, res) => {
  const currentRoute = req.path;
  res.render("about.ejs", { showHeading: false, currentPage: currentRoute });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
