// Copyright year automatic update logic
document.getElementById("copyrightYear").innerHTML = new Date().getFullYear();

// import express from "express";
// import axios from "axios";
// import bodyParser from "body-parser";
// import path from "path";
// import { fileURLToPath } from "url";
// import dotenv from "dotenv";

// dotenv.config();

// const latinAmericanPoets = [
//   "Pablo+Neruda",
//   "Octavio+Paz",
//   "César+Vallejo",
//   "Gabriela+Mistral",
//   "Jorge+Luis+Borges",
//   "Alfonsina+Storni",
//   "Juana+de+Ibarbourou",
//   "Dulce+María+Loynaz",
//   "Delmira+Agustini",
//   "Eliseo+Diego",
//   "Idea+Vilariño",
//   "Álvaro+Mutis",
//   "José+Emilio+Pacheco",
//   "Claribel+Alegría",
//   "Blanca+Varela",
// ];

// const booksApiKey = process.env.BOOKS_API_KEY;
// // const apiFirstUrl = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${authorName}+languageRestrict=es&maxResults=1&key=${booksApiKey}`;
// const apiFirstUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:"poetry"&langRestrict=es&key=${booksApiKey}`;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const port = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));

// app.set("views", path.join(__dirname, "../views"));

// // Serve static files from the 'dist/public' directory
// app.use(express.static(path.join(__dirname, "../../dist/public")));

// app.get("/", async (req, res) => {
//   try {
//     const result = await axios.get(apiFirstUrl);
//     // Handle the response data
//     const items = result.data.items;

//     const books = items.map((item) => {
//       const {
//         volumeInfo: { title, authors, description, imageLinks },
//       } = item;
//       const thumbnail =
//         imageLinks?.thumbnail || "https://via.placeholder.com/150";
//       return {
//         title,
//         authors,
//         description,
//         thumbnail,
//       };
//     });

//     console.log(books);

//     res.render("index.ejs", { books: books });
//   } catch (error) {
//     console.error("Error:", error);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
