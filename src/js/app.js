import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "../views"));

// Serve static files from the 'dist/public' directory
app.use(express.static(path.join(__dirname, "../../dist/public")));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/js/app.js", (req, res) => {
  res.sendFile(path.join(__dirname, "/main.js"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
