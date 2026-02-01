require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const TranslationService = require('./translator');

const app = express();
app.use(bodyParser.json());

app.post('/users', (req, res) => {
    // this endpoint handles creating a new user

    // debug log the incoming request body
    console.log(req.body);
    // translate the mediator request to a MySQL query, the query string and values are different to avoid SQL injection
    const { queryString, values } = TranslationService.toMysql(req.body);

    // execute the query against the database
    db.execute(queryString, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Database error' });
        }

        const response = TranslationService.fromMysql(results, req.body.action, req.body);
        res.status(201).json(response);
    });
});

app.get('/users/:id', (req, res) => {
    // this endpoint handles retrieving a user by ID

    const userId = req.params.id;
    const { queryString, values } = TranslationService.toMysql({ table: 'User', action: 'get', data: { id: userId } });

    // execute the query against the database
    db.execute(queryString, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const response = TranslationService.fromMysql(results[0], 'get');
        res.json(response);
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Wrapper A running on port ${process.env.PORT}`);
});