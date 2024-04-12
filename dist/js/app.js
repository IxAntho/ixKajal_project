import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(url);
    console.log(response.data);
    const result = response.data;
    console.log(result.secret, result.username);
    res.render("index.ejs", { secret: result.secret, user: result.username });
  } catch (error) {
    console.log(error.response.data);
  }
});

app.app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

