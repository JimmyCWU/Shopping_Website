const express = require('express');
const path = require("path");
const app = express();
const PORT = 3000;

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log("Server is listen on port:", PORT);
});

module.exports = app;

