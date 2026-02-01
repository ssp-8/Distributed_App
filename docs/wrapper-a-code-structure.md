# Wrapper-A Code Structure

## Overview

Intermediary service between mediator and MySQL database. Translates between CDM and MySQL.

## Files

- **app.js**: Express server with User endpoints
- **translator.js**: CDM ↔ MySQL translation
- **user.js**: User attribute mappings
- **db.js**: MySQL connection pool
- **cdm.json**: CDM schema definitions

## API Endpoints

| Method | Endpoint     | Purpose             |
| ------ | ------------ | ------------------- |
| POST   | `/users`     | Create user         |
| GET    | `/users/:id` | Retrieve user by ID |

## How It Works

### app.js

Receives CDM requests from mediator, uses translator to convert to MySQL queries, executes via db pool.

### translator.js

**toMysql()**: Converts CDM to MySQL

- CREATE: Builds INSERT with parameterized queries
- GET: Builds SELECT with WHERE clause

**fromMysql()**: Converts MySQL results to CDM

- CREATE: Returns inserted ID with data
- GET: Maps columns to CDM format

### user.js

Maps CDM fields to MySQL columns (id, name, email).

### db.js

MySQL connection pool with 10 concurrent connections.

### cdm.json

User schema: id (integer), name (string), email (string).

## Configuration

Environment variables:

- `PORT`: Wrapper service port
- `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`: MySQL connection details
