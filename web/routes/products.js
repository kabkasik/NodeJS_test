var express = require('express');
var router = express.Router();

router.delete('/:id', function(req, res, next) {
    console.log("Delete product id: "+req.params.id);
    res.status(204).end();
});

module.exports = router;
