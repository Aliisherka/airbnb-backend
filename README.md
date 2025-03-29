# Airbnb Clone - Backend

This is the backend for the Airbnb Clone project, built using Node.js, Express, and MongoDB. It provides API endpoints for user authentication and property listings.

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB (MongoDB Atlas)**
- **Mongoose**
- **JWT (jsonwebtoken) for authentication**
- **bcrypt for password hashing**
- **Cloudinary for image storage**
- **Render for deployment**

## API Endpoints

### Authentication
- `POST /auth` - Logs in an existing user or registers a new one if not found.

### Houses
- `GET /houses` - Retrieves a list of all properties.
- `GET /houses/:id` - Retrieves details of a specific property by ID.
- `POST /houses` - Adds a new property listing (currently available only via Postman, authentication will be required in the future).
- `GET /houses/search` - Finds houses based on query parameters (city, country, etc.).

## Installation & Usage

1. Clone the repository:
   ```sh
   git clone https://github.com/Aliisherka/airbnb-backend.git
   ```
2.	Navigate to the project directory:
   ```sh
   cd airbnb-backend
   ```
3.	Install dependencies:
   ```sh
   npm install
   ```
4.	Create a .env file in the root directory and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
5.	Start the server:
   ```sh
   npm start
   ```
6.	The server will run at http://localhost:5000/

## Future Improvements
- Restrict house creation to authenticated users when frontend integration is complete.
- Implement security measures to protect the server from hacking and other malicious activities.

## Contact
For any questions or suggestions, feel free to reach out via GitHub issues or pull requests.