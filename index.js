import express from "express";
import shortid from "shortid";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

console.table([process.env.PORT, process.env.MONGODB_URI]);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
