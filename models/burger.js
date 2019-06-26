// Import ORM to create functions to interact with database.
var orm = require("../config/orm.js");

// Create code to call ORM functions using burger specific input for the ORM.
var burger = {
    selectAll: function(cb) {
        orm.selectAll("burgers", function(res) {
            cb(res);
        });
    },

    // cols and vals are arrays.
    insertOne: function(cols, vals, cb) {
        orm.insertOne("burgers", cols, vals, function(res) {
            cb(res);
        });
    },

    updateOne: function(colAndValsObj, condition, cb) {
        orm.updateOne("burgers", colAndValsObj, condition, function(res) {
            cb(res);
        });
    }
};

// Export database functions for the controller, burgers_controller.js.
module.exports = burger;