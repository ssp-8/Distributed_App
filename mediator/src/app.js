require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const CommunicationService = require('./communicator');

const app = express();
app.use(bodyParser.json());

app.post('/users', (req, res) => {
    req.body['table'] = 'User';
    req.body['action'] = 'create';
    console.log(req.body);
    CommunicationService.sendRequest(req.body)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Communication error' });
        });
});

app.post('/books', (req, res) => {
    req.body['table'] = 'Book';
    req.body['action'] = 'create';
    CommunicationService.sendRequest(req.body)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Communication error' });
        });
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    CommunicationService.sendRequest({ table: 'User', action: 'get', data: { id: userId } })
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Communication error' });
        });
});

app.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    CommunicationService.sendRequest({ table: 'Book', action: 'get', data: { id: bookId } })
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Communication error' });
        });
});

app.listen(process.env.PORT, () => {
    console.log(`Mediator running on port ${process.env.PORT}`);
});