var express = require('express');
var router = express.Router();

var nameCategory = "category";
var nameProduct = "product";

router.get('/', function(req, res, next) {
    res.status(200).json([
        { id: 1, name: "Food", products_count: 9 },
        { id: 2, name: "Drink",products_count: 4 }
    ]);
});
router.post('/', function(req, res, next) {
    if(req.body[nameCategory] == undefined || req.body[nameCategory]["name"] == undefined || typeof(req.body[nameCategory]["name"]) != 'string'){
        res.status(400).end();
        return;
    }

    console.log("added new category: "+req.body[nameCategory]["name"]);
    res.status(201).end();
});
router.get('/:id/products', function(req, res, next) {
    console.log("category id:" + req.params.id);
    res.status(200).json([
        { id: 1, name: "Beef", price: 42.69 },
        { id: 2, name: "Cookies",price: 69.42 }
    ]);
});
router.post('/:id/products', function(req, res, next) {
    console.log("category id:" + req.params.id);

    var product = req.body[nameProduct];
    if(product == undefined
        || product["name"] == undefined
        || product["price"] == undefined
        || typeof(product["name"]) != 'string'
        || typeof(product["price"]) != 'number'
        || product["price"] <= 0
        ){
        res.status(400).end();
        return;
    }
    var name = product["name"];
    var price = product["price"];
    console.log(name + " - " + price);
    res.status(201).end();
});

module.exports = router;
