
// Require Express package
var express = require("express");

// Specify port to use
var PORT = process.env.PORT || 8080;

// Define express variable
var app = express();

// give access to public folders
app.use(express.static("public"));
app.use(express.static('public/assets/images'));


app.use(express.urlencoded({
    extended: true }));
app.use(express.json());

// require handlebars
var exphbs = require("express-handlebars");

// specify which handlebars file to use as default
app.engine("handlebars", exphbs({
    defaultLayout: "main" }));
app.set("view engine", "handlebars");

// set route variable
var routes = require("./controllers/burgerController.js");

// give express access to routes
app.use(routes);

//connect to server
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});