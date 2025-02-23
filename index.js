const { error } = require('console');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
	res.send('Hello from Nerdbord!');
});

app.post('/trains', (req, res) => {
	const filePath = path.join(__dirname, '../data/trains.json');

	if (!req.body) {
		return res.status(400).json({ error: 'Brak danych' });
	}

	try {
		const fileData = fs.readFileSync(filePath, 'utf8');
		const trains = JSON.parse(fileData);

		const newTrain = {
			id: trains.length + 1,
			trainExpressName: req.trainExpressName,
			countryOfOrigin: req.countryOfOrigin,
			yearOfConstruction: req.yearOfConstruction,
			maxKilometerPerHour: req.maxKilometerPerHour,
			destinationFrom: req.destinationFrom,
			destinationTo: req.destinationTo,
		};

		trains.push(newTrain);
		fs.writeFileSync(filePath, JSON.stringify(trains, null, 2), 'utf-8');
		res.status(201).json({ message: `Nowy pociąg dodany: ${req.trainExpressName}.` });
	} catch (error) {
		console.error('Błąd');
		res.status(500).json({ error: 'Błąd serwera' });
	}
});

app.listen(PORT, () => {
	console.log('Server listening on port 3000');
});
