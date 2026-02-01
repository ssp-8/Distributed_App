require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const TranslationService = require('./translator');

const app = express();
app.use(bodyParser.json());

app.post('/books', (req, res) => {
    console.log(req.body);
    const { queryString, values } = TranslationService.toMysql(req.body);

    db.execute(queryString, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Database error' });
        }

        const response = TranslationService.fromMysql(results, req.body.action, req.body);
        res.status(201).json(response);
    });
});

app.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const { queryString, values } = TranslationService.toMysql({ table: 'Book', action: 'get', data: { id: bookId } });

    db.execute(queryString, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const response = TranslationService.fromMysql(results[0], 'get');
        res.json(response);
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Wrapper B running on port ${process.env.PORT}`);
});