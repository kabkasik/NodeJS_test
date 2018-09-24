var express = require('express');
var router = express.Router();

var nameDir = "category";

router.get('/', function(req, res, next) {
    res.status(200).json([
        { id: 1, name: "Food", products_count: 9 },
        { id: 2, name: "Drink",products_count: 4 }
    ]);
});
router.post('/', function(req, res, next) {
    if(req.body[nameDir] == undefined || req.body[nameDir]["name"] == undefined || typeof(req.body[nameDir]["name"]) != 'string'){
        res.status(400).end();
        return;
    }

    console.log("added new category: "+req.body[nameDir]["name"]);
    res.status(201).end();
});

module.exports = router;
