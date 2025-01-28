const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

// use upload file routes
const upload = require("./src/routes/upload.file.routes");
app.use(upload);

require("./src/routes/user.routes")(app);
require("./src/routes/category.routes")(app);
require("./src/routes/product.routes")(app);

const sequelize = require("./src/config/db");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
