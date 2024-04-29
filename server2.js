const fetch = require("node-fetch");

async function fetchDataFromServer() {
  try {
    const response = await fetch("http://localhost:3000/geojson");
    const data = await response.json();
    console.log(data); // Do whatever you want with the data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchDataFromServer();
