# URL Hashing System

## Overview

This is a URL Hashing System built using **Node.js**, **Express**, and **MongoDB**. The system shortens long URLs into hashed URLs, tracks clicks, and ensures privacy by preserving query parameters and limiting URL usage.

It is designed to handle UTM tracking links for marketing campaigns and prevents formatting errors when sharing long URLs across different platforms.

## Features

- **URL Shortening**: Converts long URLs into short, hashed versions.
- **Click Tracking**: Tracks the number of clicks on each shortened URL.
- **Usage Limits**: Supports single-use or limited-use URLs with a maximum number of clicks allowed.
- **Preservation of Query Parameters**: Retains all original query parameters during redirection.
- **Privacy Awareness**: Ensures that hashed URLs do not expose sensitive data.
- **MongoDB Integration**: Stores original URLs, usage limits, and click counts in MongoDB.

## Tech Stack

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for creating RESTful APIs.
- **MongoDB**: NoSQL database for storing URL mappings and tracking data.
- **shortid**: To generate unique hash codes for URLs.
- **dotenv**: For environment variable management.
  
## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/url-hashing-system.git
   cd url-hashing-system
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGO_URI=mongodb://localhost:27017/url-hash
   ```

4. **Start the Application**:
   ```bash
   node index.js
   ```

5. **Access the API**:
   The API will be running on `http://localhost:3000`.

## API Endpoints

### 1. **Shorten a URL**

- **Endpoint**: `POST /shorten`
- **Request Body**:
   ```json
   {
     "originalUrl": "https://example.com/some-long-url",
     "maxClicks": 5
   }
   ```
- **Response**:
   ```json
   {
     "shortUrl": "http://localhost:3000/abc123"
   }
   ```

### 2. **Redirect and Track Clicks**

- **Endpoint**: `GET /:hash`
- **Response**: Redirects to the original URL and increments the click count.
- If the maximum allowed clicks are reached, returns:
   ```json
   {
     "message": "URL expired"
   }
   ```

## Project Structure

```
url-hashing-system/
│
├── index.js        # Main server logic
├── package.json    # Dependencies and project metadata
├── .env            # Environment variables
└── node_modules/   # Installed dependencies
```

## Assumptions

- This project assumes you have MongoDB installed and running locally or you are using MongoDB Atlas.
- The short URL redirection feature supports a limited number of clicks as specified by the user.



## Future Enhancements

- **AWS Deployment**: Plan to add AWS Lambda and API Gateway for a serverless setup.
- **Redis Caching**: To improve performance for frequently accessed URLs.
- **Custom Short URLs**: Allow users to specify custom aliases for URLs.
