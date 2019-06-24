var express = require("express");
var app = express();
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 8080;

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");