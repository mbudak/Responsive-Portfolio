const express = require("express");
const ejs = require("ejs");
const path = require("path");

const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
app.use(require("./routes/landing"));

// Swagger API Documentation
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger-output.json')
const swaggerAutogen = require('swagger-autogen')();


// Set EJS as templating engine
app.set('view engine', 'ejs');

// Static Files
app.use(express.static(path.join(__dirname,'public')));

// get driver connection
const dbo = require("./db/conn");

var swaggerOptions = {
  explorer: true
}

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions))
// Swagger

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});