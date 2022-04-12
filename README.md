# Good Hikes

## Good Hikes at a Glance

Good Hikes is a full stack application that allows users to browse, manage, and review hikes. Users are not required to sign up for an account if they are just browsing and searching for hikes. Logged in users can add a hike to their collections, add reviews/comments to hikes, and edit/delete their own review/comments. Currently, Good Hikes is seeded with 60 trails all over United States. User `IfIJustLayHere` loves Good Hikes so much that they visited every trail on Good Hikes and left mutiple comments on it.

## Application Architecture

Good Hikes is built on Pug frontend with an Express backend, using PostgreSQL as a database.

## Frontend Overview

Good Hikes depends on backend for queries and routes, but implemented frontend interactions to improve user experience.

### Frontend Technologies Used

#### Pug

Web pages of Good Hikes are rendered by Pug.js, a template engine for Node.js and browers. It creates dynamic reusable content.

#### CSS

Good Hikes uses CSS to style all of the HTML documents, including interactive buttons and dropdown menus.

#### Javacript

To improve user experience, Good Hikes uses Javacript to create a resonsive experiance.

### Backend Overview

Good Hikes uses an Express server with PostgreSQL database. Good Hikes also implemented feature to protect user's password and information.

#### ExpressJS

The server of Good Hikes is set up with Express JS. It is minimal and flexible enough to carry out the desired functionality while maintining the code dry.

#### Express session

Good Hikes choose to use Express Sessions to create and manage session cookies on users browser.

#### Express Validator

Express Validator is powerful yet simple. Good Hikes makes sure when users are signing up, loggin in, and creating new reviews, proper values has been inserted.

#### PostgreSQL

Good Hikes relies on PostgreSQL to maintain its relational database.

#### Sequelize

Sequelize makes it easy for Good Hikes to manage and query the database

#### bcrypt

Good Hikes values the security of users' passwords, that is why all of the passwords has been hashed by bcrypt before storing them into the database.

#### CSRF Token

A secure random CSRF token is generated on all forms that users fill in to prevent CSRF attacks.

## Conclusion and Next Steps
