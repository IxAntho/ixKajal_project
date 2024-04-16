import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files from the 'dist/public' directory
app.use(express.static(path.join(path.dirname(import.meta.url), "../public")));

app.get("/", (req, res) => {
  console.log(path.join(path.dirname(import.meta.url), "../public"));
  res.render("/Users/anthony/projects/ix_kajal/src/views/index.ejs");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
