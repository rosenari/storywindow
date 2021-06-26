var mysql = require('mysql');

var config = {
	host: `${process.env.db_host}`,
	user: `${process.env.db_user}`,
	password: `${process.env.db_password}`,
	port: `${process.env.db_port}`,
	database: `${process.env.db_schema}`,
	connectionLimit: 15,
	waitForConnections: true
};

var connection_pool = mysql.createPool(config);

module.exports = (function () {

	var connection = {};

	connection.zero_get = function (sql, req, res, handler, errhandler) {
		connection_pool.getConnection(function (err, connection) {
			if (err) {

				console.log("error:" + err);
				errhandler(res, err);

			} else {

				connection.query(sql, function (err, rows) {
					if (err) {
						console.log("error:" + err);
						errhandler(res, err);
						connection.release();
					} else {
						console.log("result:" + rows);
						handler(req, res, rows);
						connection.release();
					}
				});

			}
		});
	};

	connection.get = function (sql, req, res, handler, errhandler) {
		connection_pool.getConnection(function (err, connection) {
			if (err) {

				console.log("error:" + err);
				errhandler(res, err);

			} else {

				connection.query(sql, function (err, rows) {
					if (err) {
						console.log("error:" + err);
						errhandler(res, err);
						connection.release();
					} else {
						console.log(rows.length);
						if (!rows.length) {
							console.log("rows length")
							console.log("error:" + err);
							errhandler(res, err);
							connection.release();
						} else {
							console.log("result:" + rows);
							handler(req, res, rows);
							connection.release();
						}
					}
				});

			}
		});
	};

	connection.put = function (sql, data, req, res, handler, errhandler) {
		connection_pool.getConnection(function (err, connection) {
			if (err) {

				console.log("error:" + err);
				errhandler(res, err);

			} else {

				connection.query(sql, data, function (err, rows) {
					if (err) {
						console.log("error:" + err);
						errhandler(res, err);
						connection.release();
					} else {
						console.log("Mysql data Insert Success !");
						handler(req, res);
						connection.release();
					}
				});

			}
		});

	};

	return connection;


})();


