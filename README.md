# Simple Blog (MERN Stack)

A full-stack blog application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). Users can create, edit, delete, and read blog posts.

## Features

- User authentication (JWT-based)
- Create, read, update, and delete (CRUD) blog posts
- Rich-text editor for writing posts
- Comments system for user interaction
- Responsive UI using React.js

## Tech Stack

- **Frontend:** React.js, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JSON Web Token (JWT)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/simple-blog.git
   cd simple-blog
   ```

2. Install dependencies for both frontend and backend:
   ```sh
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Create a `.env` file in the `server` directory and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Start the backend server:
   ```sh
   cd server
   npm start
   ```

5. Start the frontend development server:
   ```sh
   cd client
   npm start
   ```

6. Open your browser and go to `http://localhost:3000`.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Blog Posts
- `GET /api/posts` - Fetch all blog posts
- `GET /api/posts/:id` - Fetch a single post by ID
- `POST /api/posts` - Create a new post (requires authentication)
- `PUT /api/posts/:id` - Update a post (requires authentication)
- `DELETE /api/posts/:id` - Delete a post (requires authentication)

## Folder Structure
```
/simple-blog
  ├── client        # React frontend
  ├── server        # Express backend
  ├── .gitignore    # Ignored files
  ├── README.md     # Project documentation
```

## Future Improvements
- Add user profile pages
- Implement likes and reactions on posts
- Improve comment moderation

## License
This project is licensed under the MIT License.

## Contributors
- Manish Kumar
