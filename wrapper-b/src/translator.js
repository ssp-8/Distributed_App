const BookModel = require('./book')

class TranslationService {
    static toMysql(query) {
        // Mediator Query is of the form: { table: 'User', action: 'create', data: { name: 'John', email: 'john@example.com' } }
        console.log(query);
        if (query.table === 'Book' && query.action === 'create') {
            console.log('In translator');
            let queryString = 'INSERT INTO books ('
            for (const key in query.data) {
                console.log(key);
                queryString += ` ${BookModel.attributeMappings[key]},`;
            }
            queryString = queryString.slice(0, -1) + ') VALUES (';
            for (const key in query.data) {
                console.log(key);
                queryString += ' ?,';
            }

            console.log(queryString);
            queryString = queryString.slice(0, -1) + ')';
            const values = Object.values(query.data);
            console.log(values);
            return { queryString, values };

        } else if (query.table === 'Book' && query.action === 'get') {
            let queryString = 'SELECT * FROM books WHERE ';

            for (const key in query.data) {
                queryString += ` ${BookModel.attributeMappings[key]} = ? AND`;
            }

            queryString = queryString.slice(0, -4);
            const values = Object.values(query.data);
            return { queryString, values };
        }
    }

    static fromMysql(result, action, metadata = {}) {
        // Translate MySQL result back to Mediator format
        if (action === 'create') {
            console.log(result)
            return {
                id: result.insertId,
                ...metadata.data
            };
        } else if (action === 'get') {
            console.log(result);
            return {
                id: result.id,
                title: result.title,
                author: result.author
            };
        }
    }
}

module.exports = TranslationService;