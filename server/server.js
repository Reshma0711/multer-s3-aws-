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




app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});


