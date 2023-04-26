# Authentification-and-Security
# My Authentication App

My Authentication App is a web application that provides user authentication using Passport.js and Google OAuth 2.0. Users can register, login, and submit secrets anonymously.

## Technologies Used

- Node.js
- Express.js
- Passport.js
- Passport-local-mongoose
- Passport-google-oauth20
- Mongoose
- MongoDB Atlas
- EJS (Embedded JavaScript) for templating
- Body-parser for parsing request bodies
- Express-session for managing sessions

## Features

- User registration with username and password
- User login with username and password
- User login with Google OAuth 2.0
- User logout
- Submitting secrets
- Viewing secrets
- Authentication and authorization using Passport.js and Passport-local-mongoose
- Storing user data in MongoDB Atlas using Mongoose

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB Atlas account for the database

### Installation

1. Clone the repository to your local machine:
2. Navigate to the project directory:
3. Install the dependencies:
4. Create a `.env` file in the project directory and add the following environment variables:
```sh
- CLIENT_ID=<your-google-client-id>
- CLIENT_SECRET=<your-google-client-secret>
- DB_USERNAME=<your-mongodb-atlas-username>
- DB_PASSWORD=<your-mongodb-atlas-password>
```
5. Start the application:

```
node app.js
```


6. Open a web browser and go to `http://localhost:3000` to access the application.

## Usage

- Register a new user account with a username and password.
- Login with your registered username and password or using your Google account.
- Submit secrets anonymously.
- View secrets submitted by other users.
- Logout to end the session.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or enhancements you would like to make.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Passport.js](http://www.passportjs.org/) for the authentication middleware.
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2) for the Google authentication.
- [Mongoose](https://mongoosejs.com/) for the MongoDB object modeling.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for the managed MongoDB database service.
- [EJS](https://ejs.co/) for the templating engine.
- [Express](https://expressjs.com/) for the web application framework.
- [Body-parser](https://www.npmjs.com/package/body-parser) for parsing request bodies.
- [Express-session](https://www.npmjs.com/package/express-session) for managing sessions.
