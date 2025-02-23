const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
	res.send('Hello from Nerdbord!');
});

app.post('/trains', (req, res) => {
	const requiredKeys = [
		'trainExpressName',
		'countryOfOrigin',
		'yearOfConstruction',
		'maxKilometerPerHour',
		'destinationFrom',
		'destinationTo',
	];

	const filePath = path.resolve(__dirname, '../data/trains.json');

	if (!req.body || !requiredKeys.every((key) => key in req.body)) {
		return res.status(400).json({ error: 'Plik nie zawiera wystarczających informacji o pociągu' });
	}

	try {
		const fileData = fs.readFileSync(filePath, 'utf8');
		const trains = JSON.parse(fileData);

		const newTrain = {
			id: trains.length + 1,
			trainExpressName: req.body.trainExpressName,
			countryOfOrigin: req.body.countryOfOrigin,
			yearOfConstruction: req.body.yearOfConstruction,
			maxKilometerPerHour: req.body.maxKilometerPerHour,
			destinationFrom: req.body.destinationFrom,
			destinationTo: req.body.destinationTo,
		};

		trains.push(newTrain);
		fs.promises.writeFileSync(filePath, JSON.stringify(trains, null, 2), 'utf-8');
		res.status(201).json({ message: `Nowy pociąg dodany: ${req.trainExpressName}.` });
	} catch (error) {
		res.status(500).json({ error: 'Błąd serwera' });
	}
});

app.listen(PORT, () => {
	console.log('Server listening on port 3000');
});
