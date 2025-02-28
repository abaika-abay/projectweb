📚 Bookstore API
A simple Node.js + Express + MongoDB application for managing books and user authentication.

🚀 Setup Instructions
1️⃣ Clone the Repository
sh

git clone https://github.com/abaika-abay/projectweb.git
cd bookstore
2️⃣ Install Dependencies
sh

npm install
3️⃣ Configure Environment Variables
Create a .env file in the root directory and add:

env

MONGO_URI=mongodb+srv://<USERNAME>:<PASSWORD>@cluster.mongodb.net/<DBNAME>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
PORT=3000
Replace <USERNAME>, <PASSWORD>, and <DBNAME> with your actual MongoDB Atlas credentials.

4️⃣ Run the Application
✅ Development Mode
sh

npm run dev
✅ Production Mode
sh

npm start
The app will run at http://localhost:3000.

📌 API Documentation
🔹 Authentication
🔸 Register a New User
Endpoint: POST /api/auth/register
Request Body:
json

{
"name": "John Doe",
"email": "johndoe@example.com",
"password": "123456"
}
Response:
json

{
"message": "User registered successfully",
"user": {
"id": "65c0f9e3f8b55a00123abcd",
"name": "John Doe",
"email": "johndoe@example.com"
}
}
🔸 Login User
Endpoint: POST /api/auth/login
Request Body:
json

{
"email": "johndoe@example.com",
"password": "123456"
}
Response:
json

{
"message": "Login successful",
"token": "jwt_token_here"
}
📖 Books API
🔹 Get All Books
Endpoint: GET /api/books
Response:
json

[
{
"id": "65c1a0f9e4b72a00123abcd",
"title": "The Great Gatsby",
"author": "F. Scott Fitzgerald",
"year": 1925
},
{
"id": "65c1a0f9e4b72a00123abce",
"title": "1984",
"author": "George Orwell",
"year": 1949
}
]
🔹 Add a New Book
Endpoint: POST /api/books
Request Body:
json

{
"title": "The Catcher in the Rye",
"author": "J.D. Salinger",
"year": 1951
}
Response:
json

{
"message": "Book added successfully",
"book": {
"id": "65c1a0f9e4b72a00123abcd",
"title": "The Catcher in the Rye",
"author": "J.D. Salinger",
"year": 1951
}
}
🔹 Get a Book by ID
Endpoint: GET /api/books/:id
Response:
json
{
"id": "65c1a0f9e4b72a00123abcd",
"title": "The Great Gatsby",
"author": "F. Scott Fitzgerald",
"year": 1925
}
🔹 Update a Book
Endpoint: PUT /api/books/:id
Request Body: (Only the fields to update)
json
{
"year": 1930
}
Response:
json
{
"message": "Book updated successfully",
"book": {
"id": "65c1a0f9e4b72a00123abcd",
"title": "The Great Gatsby",
"author": "F. Scott Fitzgerald",
"year": 1930
}
}
🔹 Delete a Book
Endpoint: DELETE /api/books/:id
Response:
json

{
"message": "Book deleted successfully"
}
🛠 Technologies Used
Node.js
Express.js
MongoDB + Mongoose
JWT Authentication
bcrypt.js for password hashing
CORS
🖥 Deployment
This project is deployed on Render.

🔗 Live Demo: https://projectweb-yfxw.onrender.com/

👨‍💻 Author
Created by Abay Toktamyssov and Issabekov Amirzhan. Feel free to contribute! 🚀