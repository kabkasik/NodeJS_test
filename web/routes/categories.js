var express = require('express');
var router = express.Router();

var nameCategory = "category";
var nameProduct = "product";

var DataBaseHandler = require("../db/MysqlHandler");
var dataBaseHandler = new  DataBaseHandler();
var connection = dataBaseHandler.createConnection();

router.get('/', function(req, res, next) {
    connection.query('SELECT  a.id, a.name , (SELECT Count(id) FROM `products` WHERE `categories_id` = `a`.`id`) as products_count\n' +
        'FROM categories a\n' +
        'ORDER BY name ASC' +
        ' LIMIT 10000', function (error, result, fields) {
        if (error) throw error;
        var objs = JSON.parse(JSON.stringify(result));
        res.status(200).json(objs);
    });
});
router.post('/', function(req, res, next) {
    if (req.body[nameCategory] == undefined || req.body[nameCategory]["name"] == undefined || typeof(req.body[nameCategory]["name"]) != 'string') {
        res.status(400).end();
        return;
    }
    connection.query('SELECT `name` FROM `categories` WHERE `name` = "' + req.body[nameCategory]["name"] + '" LIMIT 10000', function (error, result, fields) {
        if (error) throw error;
        if (result.length > 0) {
            res.status(409).end();
            return;
        }
        connection.query("INSERT INTO `categories` (`name`) VALUES ('"+req.body[nameCategory]["name"]+"')", function (error, result, fields) {
            if (error) throw error;
            res.status(201).end();
        });
    });
});
router.get('/:id/products', function(req, res, next) {
    var number_id = Number(req.params.id);
    if(isNaN(number_id) || number_id<=0){
        res.status(400).end();
        return;
    }
    connection.query('SELECT `id`, `name`, `price` FROM `products` WHERE `categories_id` = '+number_id+' LIMIT 10000', function (error, result, fields) {
        if (error) throw error;
        var objs = JSON.parse(JSON.stringify(result));
        objs.forEach(function(element){
            element.price /= 100;
        });
        res.status(200).json(objs);
    });
});
router.post('/:id/products', function(req, res, next) {
    console.log("category id:" + req.params.id);

    var number_id = Number(req.params.id);
    if(isNaN(number_id) || number_id<=0){
        res.status(400).end();
        return;
    }


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
    var price = Math.round(product["price"]*10);

    connection.query('SELECT `id`, `name`, `price` FROM `products` WHERE `categories_id` = '+number_id+' AND `name` = "'+name+'" LIMIT 10000', function (error, result, fields) {
        if (error) throw error;
        if (result.length > 0) {
            res.status(409).end();
            return;
        }
        connection.query("INSERT INTO `products` (`name`, `categories_id`, `price`) VALUES ('"+name+"', "+number_id+", "+price+")", function (error, result, fields) {
            if (error) throw error;
            res.status(201).end();
        });
    });

    console.log(name + " - " + price);
    res.status(201).end();
});

module.exports = router;
