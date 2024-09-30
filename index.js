import express from "express";
import shortid from "shortid";
import dotenv from "dotenv";
import connectDB from "./DB.js";
dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  });

const URL = {}; // Simple in-memory storage, replace with a DB

//POST endpoint to generate hashed URLs.
app.post("/shorten", async (req, res) => {
  const { originalURL, maxClicks } = req.body;
  const id = shortid.generate();

  URL[id] = { originalURL, maxClicks, clicks: 0 };

  console.log(URL);

  res.json({ shortUrl: `http://localhost:${port}/${id}` });
});

//GET endpoint to handle redirection and track the number of clicks.

app.get("/:id", async (req, res) => {
  const { id } = req.params;

  const urlData = URL[id];
  if (!urlData) return res.status(404).json({ message: "URL not found" });

  if (urlData.clicks >= urlData.maxClicks)
    return res.json({ message: "URL expired" });

  urlData.clicks++;

  res.redirect(urlData.originalURL);
});
