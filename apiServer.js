// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express(); // Create an Express application
var router = require("express").Router(); // Create a router instance
const port = 3400; // Define the server port

// Middleware setup
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors({ origin: "*" })); // Enable CORS for all origins
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(morgan("dev")); // Log HTTP requests to the console
var verifyToken = require("./auth/verifyToken"); // Import JWT verification middleware
var ConstantFile = require("./utilities/Constants"); // Import constants for the application
const nocache = require("nocache"); // Import nocache middleware to prevent caching

app.use(nocache()); // Use nocache middleware
app.use(function (req, res, next) {
  // Set custom headers to prevent caching
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization, x-refresh-token, x-access-token, x-account-token, app-type, ghest"
  );

  // Handle pre-flight requests
  if (req.method == "OPTIONS") {
    res.status(200).json(); // Respond to OPTIONS requests
  } else {
    next(); // Continue to the next middleware
  }
});

function apiServer() {
  /** JWT token handle */
  router.use((req, res, next) => {
    // Check if the current path should bypass JWT verification
    if (ConstantFile.Constant.JWT_BYPASS_API.includes(req.path)) {
      next(); // Bypass token verification
    } else {
      verifyToken.verifyToken(req, res, next); // Verify the token
    }
  });
  /** End here */

  // Import and use API routes
  require("./api/userApi").userApi(router);
  require("./api/cartApi").cartApi(router);
  require("./api/productApi").productApi(router);

  // Mount the router at the /shopping_cart path
  app.use("/shopping_cart", router);

  // Handle unsupported request methods
  app.use("/shopping_cart", (req, res, next) => {
    if (req.method === "GET") {
      res.status(405).send({
        status: "fail",
        message: "Request method not supported or API not found ",
      });
    } else if (req.method === "POST") {
      res.status(405).send({
        status: "fail",
        message: "Request method not supported or API not found",
      });
    } else {
      res.status(404).send("404 - API not found. "); // Respond with 404 for other methods
    }
  });

  // Create and start the HTTP server
  var httpServer = http.createServer(app).listen(port, function () {
    var host = httpServer.address().address; // Get the server address
    console.log(`Server running on this ${host} host`);
    var port = httpServer.address().port; // Get the server port
    console.log(`Server running on this ${port} port`);
  });
}

// Export the apiServer function for use in other modules
module.exports = { apiServer };
