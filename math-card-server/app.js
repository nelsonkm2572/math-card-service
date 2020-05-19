const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();

function rowToObject(row) {
	return {
		firstNumber: row.first_number,
		secondNumber: row.second_number,
		operator: row.operator,
		answer: row.answer,
		id: row.id,
	};
}

app.get('/cards', (request, response) => {
	const query = 'SELECT first_number, second_number, operator, answer, id FROM card WHERE is_deleted = 0 ORDER BY created_at DESC, updated_at DESC';
	//const params = [request.params.firstNumber, request.params.secondNumber];
	//params, after query
	connection.query(query, (error, rows) => {
		response.send({
			ok: true,
			cards: rows.map(rowToObject),
		});
	});
});

app.post('/card', (request, response) => {
	const query = 'INSERT INTO card(first_number, second_number, operator, answer) VALUES (?, ?, ?, ?)';
	const params = [request.body.firstNumber, request.body.secondNumber, request.body.operator, request.body.answer];
	connection.query(query, params, (error, result) => {
		response.send({
			ok: true,
			id: result.insertId,
		});
	});
});

app.patch('/cards/:id', (request, response) => {
	const query = 'UPDATE card SET first_number = ?, second_number = ?, operator = ?, answer = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
	const params = [request.body.firstNumber, request.body.secondNumber, request.body.operator, request.body.answer, request.params.id];
	connection.query(query, params, (error, result) => {
		response.send({
			ok: true,
		});
	});
});

app.delete('/cards/:id', (request, response) => {
	const query = 'UPDATE card SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
	const params = [request.params.id];
	connection.query(query, params, (error, result) => {
		response.send({
			ok: true,
		});
	});
});

const port = 3443;
app.listen(port, () => {
	console.log(`We're live on port ${port}!`);
});
