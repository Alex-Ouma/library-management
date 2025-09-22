Library Management System CRUD Application
Overview
This is a Node.js (Express) CRUD application for a Library Management System that interacts with a MySQL database. It implements CRUD operations for Books and Members entities.
Prerequisites

Node.js (v16 or higher)
MySQL Server
npm

Setup Instructions

Clone the repository:

git clone <repository-url>
cd library-management


Install dependencies:

npm install


Set up the MySQL database:


Create a MySQL database named library_management
Run the SQL script library_management.sql to create tables and constraints
Update the database configuration in config/database.js with your MySQL credentials:

module.exports = {
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'library_management'
};


Start the application:

npm start

The server will run on http://localhost:3000
API Endpoints
Books

GET /api/books - List all books
GET /api/books/:id - Get a specific book by ID
POST /api/books - Create a new book
Body: { "title": "Book Title", "isbn": "1234567890123", "publication_year": 2023, "publisher": "Publisher Name", "total_copies": 5, "available_copies": 5 }


PUT /api/books/:id - Update a book
Body: { "title": "Updated Title", "isbn": "1234567890123", "publication_year": 2023, "publisher": "Updated Publisher", "total_copies": 6, "available_copies": 4 }


DELETE /api/books/:id - Delete a book

Members

GET /api/members - List all members
GET /api/members/:id - Get a specific member by ID
POST /api/members - Create a new member
Body: { "first_name": "John", "last_name": "Doe", "email": "john.doe@example.com", "join_date": "2023-01-01", "phone": "1234567890" }


PUT /api/members/:id - Update a member
Body: { "first_name": "Jane", "last_name": "Doe", "email": "jane.doe@example.com", "join_date": "2023-01-01", "phone": "0987654321" }


DELETE /api/members/:id - Delete a member

Project Structure
library-management/
├── config/
│   └── database.js      # Database configuration
├── routes/
│   ├── books.js        # Book routes
│   └── members.js      # Member routes
├── package.json        # Project dependencies
├── server.js           # Main application file
└── library_management.sql  # Database schema

Error Handling

The API returns appropriate HTTP status codes
Error responses include a JSON object with an error property describing the issue
