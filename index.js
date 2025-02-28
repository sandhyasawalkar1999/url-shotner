import express from "express";
import { nanoid } from 'nanoid';

import fs from "node:fs";

/**
 * 1. Long to short url api => input : long url, output : short url
 * 2. Short to long url redirection => input: short url, output : redirection to long url
 */


const app = express();

// Middlewares
app.use(express.json());

app.post("/long-to-short", (req, res) => {
  // console.log(req.body.longUrl);
  const uniqueId = nanoid(8)
  const shortUrl = "http://localhost:5000/" + uniqueId;
  const fileData = fs.readFileSync("url-data.json");
  const urlObj = JSON.parse(fileData.toString());

  urlObj[uniqueId] = req.body.longUrl;

  fs.writeFileSync("url-data.json", JSON.stringify(urlObj));

  res.json({
    success: true,
    data: shortUrl
  });
});

app.get("/:shortUrl", (req, res) => {
  const uniqueId = req.params.shortUrl;
  const fileData = fs.readFileSync("url-data.json");
  const urlObj = JSON.parse(fileData);
  const longUrl = urlObj[uniqueId];

  res.redirect(longUrl);
  // res.json({
  //     success: true,
  //     data: longUrl
  // })
});

app.listen(5000, () => console.log(`Server is up and running at port 5000`));