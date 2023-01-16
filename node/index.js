const express = require("express");
const app = express();

const config = {
	host: "db",
	user: "root",
	password: "root",
	database: "nodedb",
	port: "3306",
};

const mysql = require("mysql");

async function getAllPeople(res, connection) {
	const SQL = `SELECT id, nome FROM people;`;

	connection.query(SQL, (error, results, fields) => {
		if (error) throw error;
		let tableHTML = `<table>`;
		tableHTML += "<tr><th>ID</th><th>Nome</th></tr>";

		for (let person of results) {
			tableHTML += `<tr><th>${
				person.id
			}</th><th>${person.nome.toUpperCase()}</th></tr>`;
		}

		tableHTML += `</table>`;

		res.send("<h1>FullCycle Rocks!</h1>" + tableHTML);
	});

	connection.end();
}

async function insertPersonName(res) {
	const connection = mysql.createConnection(config);
	const sql = `INSERT INTO people(nome) VALUES('NOME ${Math.ceil(
		Math.random() * 1000
	)}')`;

	connection.query(sql);
	getAllPeople(res, connection);
}

app.get("/", (req, res) => {
	insertPersonName(res);
});

app.listen("3000", () => {
	console.log("Server up on PORT 3000");
});
