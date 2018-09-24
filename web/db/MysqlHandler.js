var mysql = require("mysql");

var limitMaxRow = ' LIMIT 10000';

function MysqlHandler() {
    this.connection = null;
}

MysqlHandler.prototype.createConnection = function () {

    this.connection = mysql.createConnection({
        host: process.env.DATABASE_HOST || '127.0.0.1',
        user: 'test',
        password: '1234',
        database: 'test',
        port: 3306
    });

    this.connection.connect(function (error) {
        if (error) {
            console.error("error connecting " + error.stack);
            return null;
        }
    });
    return this.connection;
};


module.exports = MysqlHandler;
