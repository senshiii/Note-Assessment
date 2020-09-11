const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

// DATABASE CONNECTION
mongoose
	.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => {
		console.log('Connected to DB');
	})
	.catch((err) => console.log(err));

// GENERAL MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded( { extended: true }));

// CORS MIDDLEWARES
app.use((req, res, next) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Headers', '*');
	if (req.method === 'OPTIONS') {
		res.set('Access-Control-Allow-Methods', 'GET, POST, PUT , DELETE, UPDATE');
	}
	next();
});

// ROUTES
app.use('/notes', require('./routes/notes'));

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    if (err.code == 500) {
        res.status(500).json({ message: 'Server Crash' })
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
