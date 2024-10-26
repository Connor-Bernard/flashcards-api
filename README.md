# Flashcard API

This is a web api that can be used at scale to manage flashcards.

## Setup

1. Ensure your system requirements comply with the package file.
1. Generate your local database with `npx prisma init`
1. Migrate the schema with `npx prisma migrate`
1. Run the server with `npm start`

## Configuration

This app will default to running on port 3000 if the port is not already being listened on by a different process on the host.  You can configure this with the environment variable `PORT`.  You may also specify this in a .env file.

## Routes and routing

### Routes and Routing

The following routes are available in this API:

#### `GET api/v1/cards`

- __Description__: Retrieve a list of all flashcards.
- __Response__:
  - `200 OK`: Returns an array of flashcards.
- __Example Response__:

  ```json
  [
      {
          "id": 1,
          "front": "front",
          "back": "back"
      }
  ]
  ```

#### `GET api/v1/cards/:id`

- __Description__: Retrieve a specific flashcard by its ID.
- __Parameters__:
  - `id` (required) [int]: The ID of the flashcard.
- __Response__:
  - `200 OK`: Returns the flashcard object.
  - `400 Bad Request`: If the provided id is not a an integer.
  - `404 Not Found`: If the flashcard with the specified ID does not exist.
- __Example Response__:

  ```json
  {
      "id": 1,
      "front": "front",
      "back": "back"
  }
  ```

#### `GET api/v1/cards/random`

- __Description__: Retrieve a random flashcard.
- __Response__:
  - `200 OK`: Returns the flashcard object.
  - `409 Conflict`: If the database doesn't have any cards yet.
- __Example Response__:

  ```json
  {
      "id": 1,
      "front": "front",
      "back": "back"
  }
  ```

#### `POST api/v1/cards`

- __Description__: Create a new flashcard.
- __Request Body__:
  - `question` (required) [string]: The question text of the flashcard.
  - `answer` (required) [string]: The answer text of the flashcard.
- __Response__:
  - `201 Created`: Returns the created flashcard object.
  - `400 Bad Request`: If the request body is invalid.
- __Note__: The text passed in will be sanitized before being saved.

#### `DELETE api/v1/cards/:id`

- __Description__: Delete a specific flashcard by its ID.
- __Parameters__:
  - `id` (required) [int]: The ID of the flashcard.
- __Response__:
  - `204 No Content`: Confirms the flashcard has been deleted.
  - `400 Bad Request`: If the provided id is not an integer.
  - `404 Not Found`: If the flashcard with the specified ID does not exist.

## Developing

1. Ensure your environment contains the following:

  ```bash
  NODE_ENV=dev
  DATABASE_URL=file:./dev.db
  ```

1. Migrate the db for the dev db with `npx prisma migrate dev`.
1. Run `npm run dev` to run the development server.