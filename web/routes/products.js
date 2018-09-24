var express = require('express');
var router = express.Router();

var DataBaseHandler = require("../db/MysqlHandler");
var dataBaseHandler = new  DataBaseHandler();
var connection = dataBaseHandler.createConnection();

router.delete('/:id', function(req, res, next) {
    console.log("Delete product id: "+req.params.id);
    connection.query("DELETE FROM `categories` WHERE `categories`.`id` = "+req.params.id, function (error, result, fields) {
        if (error) throw error;
        res.status(204).end();
    });
});

module.exports = router;
