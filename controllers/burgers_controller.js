// Import Express and burger.js.
var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

// Create routes.
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var hbsObject = {
            burgers: data
        };

        console.log(hbsObject);

        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res) {
    burger.insertOne(
        ["burger_name", "devoured"],
        [req.body.burger_name, req.body.devoured],
        function(result) {
            res.json({id: result.insertId});
        }
    );
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne(
        {devoured: req.body.devoured},
        condition,
        function(result) {
            if (result.changedRows == 0) {
                // If no rows were changed, Id must be non-existant, return 404 status.
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        }
    );
});

// Export routes for server.js to use.
module.exports = router;