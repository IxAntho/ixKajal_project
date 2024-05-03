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

const latinAmericanWriters = [
  // Poets
  "Pablo+Neruda",
  "Octavio+Paz",
  "César+Vallejo",
  "Gabriela+Mistral",
  "Jorge+Luis+Borges",
  "Alfonsina+Storni",
  "Juana+de+Ibarbourou",
  "Dulce+María+Loynaz",
  "Delmira+Agustini",
  "Eliseo+Diego",
  "Idea+Vilariño",
  "Álvaro+Mutis",
  "José+Emilio+Pacheco",
  "Claribel+Alegría",
  "Blanca+Varela",
  "Nicanor+Parra",
  "Olga+Orozco",
  "Gioconda+Belli",
  "Amalia+Bautista",
  "José+Lezama+Lima",
  "Alejandra+Pizarnik",
  "Ida+Vitale",
  "Jaime+Sabines",
  "Efraín+Huerta",
  "José+Gorostiza",
  "Xavier+Villaurrutia",
  "Rubén+Darío",
  "Amado+Nervo",
  "Manuel+Gutiérrez+Nájera",
  "Jaime+Torres+Bodet",
  "Rosario+Castellanos",
  "Sor+Juana+Inés+de+la+Cruz",
  "Cintio+Vitier",
  "Nancy+Morejón",
  "Fayad+Jamís",
  "Eugenio+Florit",
  "Emilio+Ballagas",
  "Mariano+Brull",
  "Nicolás+Guillén",
  "José+Martí",
  // Novelists, short story writers, essayists
  "Gabriel+García+Márquez",
  "Mario+Vargas+Llosa",
  "Isabel+Allende",
  "Julio+Cortázar",
  "Carlos+Fuentes",
  "Juan+Rulfo",
  "Miguel+Ángel+Asturias",
  "Alejo+Carpentier",
  "José+Donoso",
  "Clarice+Lispector",
  "Juan+Carlos+Onetti",
  "Reinaldo+Arenas",
  "Manuel+Puig",
  "José+Lezama+Lima",
  "José+María+Arguedas",
  "Romulo+Gallegos",
  "Adolfo+Bioy+Casares",
  "José+Eustasio+Rivera",
  "Jorge+Icaza",
  "Horacio+Quiroga",
  "José+Revueltas",
  "Juan+José+Arreola",
  "Ricardo+Piglia",
  "Severo+Sarduy",
];

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

// Serve static files from the 'dist/public' directory
app.use(express.static(path.join(__dirname, "../../dist/public")));

// Route handler for the root URL
app.get("/", async (req, res) => {
  try {
    // Array to store raw book data from the API
    const rawBooks = [];

    // Loop through the list of Latin American writers
    for (const authorName of latinAmericanWriters) {
      // Construct the API URL to search for books by the current author in Spanish
      const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=inauthor:"${authorName}"+languageRestrict=es&maxResults=1&key=${booksApiKey}`;

      // Make an asynchronous request to the Google Books API
      const result = await axios.get(apiUrl);

      // Get the first item from the API response (if any)
      const item = result.data.items;

      // If an item exists, add it to the rawBooks array
      item !== undefined ? rawBooks.push(item[0]) : null;
    }

    // Log the raw book data to the console
    console.log(rawBooks);

    // Map over the raw book data to create a cleaned-up array of book objects
    const books = rawBooks.map((book) => {
      const {
        volumeInfo: { title, subtitle, authors, description, imageLinks },
      } = book;

      // Use a placeholder thumbnail if no thumbnail is available
      const thumbnail =
        imageLinks?.thumbnail || "https://via.placeholder.com/150";

      // Use a default subtitle or description if they are not available
      const subTitle = subtitle ?? "No subtitle available";
      const descriptionText = description ?? "No description available";

      // Return a cleaned-up book object
      return {
        title,
        authors,
        description: descriptionText,
        thumbnail,
        subtitle: subTitle,
      };
    });

    // Log the cleaned-up book data to the console
    console.log("books", books);

    // Render the 'index.ejs' view
    res.render("index.ejs");
  } catch (error) {
    // Log any errors to the console
    console.error("Error:", error);
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
