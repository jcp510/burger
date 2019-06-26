var express = require("express");

// Nodejs process.env property returns object containing user environment.
var PORT = process.env.PORT || 8080;

var app = express();

// To serve static files.
app.use(express.static("public"));

// Parse application body.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");
app.use(routes);

// Start server, listen for client requests.
app.listen(PORT, function() {
    // Log server-side when server starts.
    console.log("Server listening on: http://localhost:" + PORT);
});