# Viva Quick Notes

## What is React.js, and why is it used?
React.js is a JavaScript library for building user interfaces. In this project it is used to build the frontend with reusable functional components and to update the interface without reloading the page.

## Difference between React and Node.js
React is mainly used to build the browser user interface. Node.js is a JavaScript runtime used here to run the backend server.

## What is Express.js?
Express.js is a web framework for Node.js. It simplifies creating HTTP routes, APIs, and middleware.

## What are useState and useEffect?
`useState` stores component state such as form values and student data. `useEffect` performs side effects such as fetching student records when the page first loads.

## Difference between GET and POST
GET requests data from the server. POST sends data to the server to create a new resource.

## What is a REST API?
A REST API exposes resources through HTTP endpoints and methods such as GET, POST, PUT, and DELETE.

## Purpose of express.json()
`express.json()` parses JSON request bodies so data sent by the React frontend can be accessed through `req.body`.

## What is CORS, and why is it required?
CORS controls requests between different origins. During development, React normally runs on port 5173 while Express runs on port 5000, so the backend enables CORS to allow the frontend to call it.

## Difference between PUT and PATCH
PUT is normally used to replace/update a complete resource. PATCH is normally used to update only selected fields.

## Why is in-memory data lost when the server restarts?
The student array exists only in the Node.js process memory. When the process stops, that memory is cleared.

## How does React communicate with the backend?
React uses the browser Fetch API to send HTTP requests to the Express REST API and receives JSON responses.

## Client-side vs server-side validation
Client-side validation gives quick feedback in the browser. Server-side validation is essential because requests can reach the API without using the frontend, so the server must verify all data before accepting it.
