var express = require('express');
var router = express.Router();

var DataBaseHandler = require("../db/MysqlHandler");
var dataBaseHandler = new  DataBaseHandler();
var connection = dataBaseHandler.createConnection();

router.delete('/:id', function(req, res, next) {
    console.log("Delete product id: "+req.params.id);
    var number_id = Number(req.params.id);
    if(isNaN(number_id) || number_id<=0){
        res.status(400).end();
        return;
    }
    connection.query("DELETE FROM `products` WHERE `products`.`id` = "+number_id, function (error, result, fields) {
        if (error) throw error;
        res.status(204).end();
    });
});

module.exports = router;
