const { pool } = require("../database");

const postUser = async (req, res) => {
	try {
		let params = [req.body.name, req.body.last_name, req.body.email, req.body.photo, req.body.password];
		let sql = `INSERT INTO user (name, last_name, email, photo, password) VALUES (?, ?, ?, ?, ?)`;
		let [result] = await pool.query(sql, params);
		let user = console.log(result);

		let answer = { error: false, code: 200, message: "Registro completado" };

		res.send(answer);
	} catch (err) {
		let answer = { error: true, code: 0, message: "Se ha producido un error" };
		if (err.code == "ER_DUP_ENTRY") {
			answer = { error: true, code: 1, message: "Ya existe un usuario con ese email" };
		}

		res.send(answer);
		console.log(err);
	}
};

const postLogin = async (req, res) => {
	try {
		let params = [req.body.email, req.body.password];
		// console.log(params);

		let sql = `SELECT id_user, name, last_name, email, photo FROM user WHERE (email = ? AND password = ?)`;

		let [result] = await pool.query(sql, params);

		let answer = { error: false, code: 200, message: "Login OK", data: result };
		if (result.length == 0) {
			answer = { error: true, code: 2, message: "Email y/o contraseña incorrectos" };
		}

		res.send(answer);
	} catch (err) {
		console.log(err);
	}
};

const putUser = async (req, res) => {
	try {
		let params = [req.body.name, req.body.last_name, req.body.email, req.body.photo, req.body.password, req.body.id_user];

		let sql = `UPDATE user SET name = COALESCE(?, name), last_name = COALESCE(?, last_name), email = COALESCE(?, email), photo = COALESCE(?, photo), password = COALESCE(?, password) WHERE id_user = ? `;

		let [result] = await pool.query(sql, params);

		let answer = { error: false, code: 200, message: "Usuario actualizado" };
		res.send(answer);
	} catch (err) {
		console.log(err);
	}
};

module.exports = { postUser, postLogin, putUser };
