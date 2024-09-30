import express from "express";
import shortid from "shortid";
import dotenv from "dotenv";
import connectDB from "./DB.js";
import { Url } from "./urlSchema.js";

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

//POST endpoint to generate hashed URLs.
app.post("/shorten", async (req, res) => {
  const { originalUrl, maxClicks } = req.body;
  const hash = shortid.generate();

  const url = new Url({ originalUrl, hash, maxClicks });
  await url.save();

  res.json({ shortUrl: `http://localhost:${port}/${hash}` });
});

//GET endpoint to handle redirection and track the number of clicks.

app.get("/:hash", async (req, res) => {
  const { hash } = req.params;

  const url = await Url.findOne({ hash });
  if (!url) return res.status(404).json({ message: "URL not found" });

  if (url.clicks > url.maxClicks) return res.json({ message: "URL expired" });

  url.clicks += 1;
  const updatedUrl = await url.save();
  // console.log(updatedUrl);
  res.redirect(updatedUrl.originalUrl);
});
