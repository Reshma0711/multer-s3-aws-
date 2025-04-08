const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.port;


const { dbConnect } = require("./dbconnect");
dbConnect();

const uploadRoutes = require("./routes/upload");

app.use(express.json());


// upload multiple files (e.g., up to 5 images)
app.use('/',uploadRoutes );


// get images from getApi which are stored in database

app.get('/', async (req, res) => {
  try {
    const files = await require('../models/File').find().sort({ uploadDate: -1 });
    res.status(200).json({ files });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch files', error: err.message });
  }
});



app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});


