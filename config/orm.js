// Import mysql connection.
var connection = require("../config/connection.js");

// Create the following methods to execute mysql commands in controllers.
// *  selectAll()
// *  insertOne()
// *  updateOne()

// Helper function for sql syntax, produes question marks to be used in sql queries.
function questionMarks(num) {
    var arr = [];
    
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key-value pairs to sql syntax.
function objConverter(ob) {
    var arr = [];

    // Loop through keys, push key/value as string into arr.
    for (var key in ob) {
        var value = ob[key];

        // Check to skip hidden properties.
        if (Object.hasOwnProperty.call(ob, key)) {

            // If string with spaces, add quotations.
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }

            arr.push(key + "=" + value);
        }
    }

    // Convert array of strings to single comma separated string.
    return arr.toString();
}

// Object for all sql statement functions.
var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },

    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += questionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, res) {
            if (err) {
                throw err;
            }

            cb(res);
        });
    },

    updateOne: function(table, colAndValsObj, condition, cb) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objConverter(colAndValsObj);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function(err, res) {
            if (err) {
                throw err;
            }

            cb(res);
        });
    }
};

// Export orm object for the model, burger.js.
module.exports = orm;