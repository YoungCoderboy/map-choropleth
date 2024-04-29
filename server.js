const fs = require("fs");
const express = require("express");

const app = express();
const port = 3000;

app.get("/geojson", (req, res) => {
  // Read the GeoJSON file from the local file system
  fs.readFile("./apple.geojson", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Parse the GeoJSON data
    let geojson;
    try {
      geojson = JSON.parse(data);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Send the GeoJSON data as the response
    res.json(geojson);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
