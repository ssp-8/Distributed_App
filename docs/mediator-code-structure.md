# Mediator Code Structure

## Overview

Central interface that handles client requests and routes them to appropriate wrapper services.

## Files

- **app.js**: Express server with REST endpoints for User and Book resources
- **communicator.js**: Handles HTTP communication with wrapper services
- **cdm.json**: Common Data Model schema definitions

## API Endpoints

| Method | Endpoint     | Purpose             |
| ------ | ------------ | ------------------- |
| POST   | `/users`     | Create user         |
| POST   | `/books`     | Create book         |
| GET    | `/users/:id` | Retrieve user by ID |
| GET    | `/books/:id` | Retrieve book by ID |

## How It Works

### app.js

Receives client requests, adds metadata (`table`, `action`), and delegates to `CommunicationService`.

### communicator.js

Routes requests to wrappers:

- Constructs wrapper URL from environment variables (e.g., `USER_SERVICE_URL`)
- Sends POST for create operations
- Sends GET for retrieve operations

### cdm.json

Defines schemas for User (id, name, email) and Book (id, title, author).

## Configuration

Environment variables:

- `PORT`: Mediator service port
- `USER_SERVICE_URL`: Wrapper for User data
- `BOOK_SERVICE_URL`: Wrapper for Book data
