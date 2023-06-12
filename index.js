const express = require('express');
const app = express();
const { get } = require('http');

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
	res.send('Hello from');
});

app.listen(PORT, () => {
	console.log('Server listening on port 3000');
});

app.get('/data/trains', (req, res) => {

});