// variable for express
var express = require("express");

// router variable
var router = express.Router();

// burger model variable
var burger = require("../models/burger");

// establishing route to homepage
router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// visual json representation of api
router.get("/api/burgers", function(req, res) {
    burger.all(function(data) {
        res.json(data)
    });
});

// establishing and posting to api
router.post("/api/burgers", function(req, res) {
    burger.create([
        "name", "devoured"
    ], [
        req.body.name, req.body.devoured
    ], function(result) {
        res.json({ id: result.insertId})
    });
});

// updating burger if needed
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);


    burger.update({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


// deleting burgers if needed
router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burger.delete(condition, function(result) {
        if(result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            return res.status(200).end();
        }
    })
})


// making routes available to other files
module.exports = router;