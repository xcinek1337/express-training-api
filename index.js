const express = require('express');
const app = express();
const fs = require('fs');

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
	res.send('Hello from Nerdbord!');
});

app.listen(PORT, () => {
	console.log('Server listening on port 3000');
});




fs.readFile('./data/trains.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Błąd odczytu pliku:', err);
    return;
  }

  const trains = JSON.parse(data);

  console.log(trains);
});