const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
require('dotenv').config();
const dbConnect = require('./utils/database');
const shortUrl = require('./resources/shortUrl.router');

app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.use('/api/shorturl', shortUrl);

app.use((req, res) => {
	return res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
});

const start = async () => {
	try {
		await dbConnect(process.env.DB_URI, { useUnifiedTopology: true });
		app.listen(process.env.PORT || 3000, () => {
			console.log(`App is on http://localhost:${process.env.PORT || 3000}`);
		});
	} catch (e) {
		console.error(e);
	}
};

module.exports = start;