const express = require("express");
const bodyParser = require ("body-parser");
const connectDB = require ("./config/dbConfig");
const routes = require ("./controllers/receipeController");



const app = express();

app.use(bodyParser.json());

app.use('/', routes);

connectDB();

const PORT = process.env.PORT || 1927;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});