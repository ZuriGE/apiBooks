const { pool } = require("../database");

const getBook = async (req, res) => {
	try {
		let params = [req.query.id_user];
		let sql;

		if (req.query.id_book == null || typeof req.query.id_book == "undefined") {
			sql = `SELECT * FROM book WHERE id_user = ? `;
		} else {
			params.push(req.query.id_book);
			sql = `SELECT * FROM book WHERE id_user = ? AND id_book = ? `;
		}

		let [result] = await pool.query(sql, params);

		let answer = { error: false, code: 200, message: "Búsqueda OK", data: result };
		if (result.length == 0) {
			answer = { error: true, code: 1, message: "libro no encontrado" };
		}
		res.send(answer);
	} catch (err) {}
};

const postBook = async (req, res) => {
	try {
		let params = [req.body.id_user, req.body.title, req.body.type, req.body.author, req.body.price, req.body.photo];

		//MIRAR SI EXISTE
		let sqlCheck = `SELECT * FROM book WHERE id_user = ? AND title = ?`;
		let [checkResult] = await pool.query(sqlCheck, params);
		let answer;
		if (checkResult.length != 0) {
			answer = { error: true, code: 1, message: "El libro ya existe", data: result };
		} else {
			let sql = `INSERT INTO book (id_user, title, type, author, price,photo) VALUES (?,?,?,?,?,?)`;
			let [result] = await pool.query(sql, params);
			answer = { error: false, code: 200, message: "Libro añadido", data: result };
		}

		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 1, message: "El libro ya existe" };
		res.send(answer);
	}
};

const putBook = async (req, res) => {
	try {
		let params = [req.body.title, req.body.type, req.body.author, req.body.price, req.body.photo, req.body.id_book];
		let sql = "UPDATE book SET title = COALESCE(?, title),type = COALESCE(?, type),author = COALESCE(?, author), price = COALESCE(?, price), photo = COALESCE(?, photo) WHERE id_book = ?";

		let [result] = await pool.query(sql, params);

		res.send(result);
	} catch (err) {}
};

const delBook = async (req, res) => {
	try {
		let params = [req.query.id_book];
		let sqlCheck = `SELECT * FROM book WHERE id_book = ?`;
		let [checkResult] = await pool.query(sqlCheck, params);
		let answer;
		if ((checkResult.length = 0)) {
			answer = { error: true, code: 1, message: "el libro no existe", data: result };
		} else {
			let sql = `DELETE FROM book WHERE id_book = ?`;
			let [result] = await pool.query(sql, params);
			answer = { error: false, code: 200, message: "Libro eliminado", data: result };
		}

		res.send(answer);
	} catch (err) {
		console.log(err);
	}
};

module.exports = { getBook, postBook, putBook, delBook };
