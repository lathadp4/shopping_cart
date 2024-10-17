const userService = require("../service/userService"); // Importing user service for handling user-related operations
const userServiceManager = new userService.userService(); // Creating an instance of user service manager
const ApiResponse = require("../utilities/apiResponse"); // Importing API response utility for consistent response structure
const apiResponse = new ApiResponse.ApiResponse(); // Creating an instance of API response utility
const LoggerServiceModule = require("../utilities/logger"); // Importing logger service for logging information and errors
const infoLoggerService = LoggerServiceModule.info_logger; // Getting the info logger from the logger service
const errorLoggerService = LoggerServiceModule.error_logger; // Getting the error logger from the logger service

function userApi(router) {
  // Defining API endpoints
  var loginApi = "/login"; // Endpoint for user login
  var createApi = "/createUser"; // Endpoint for user creation
  var objResponse = { status: false }; // Default response object

  /** Login API */
  router.post(loginApi, function (req, res) {
    var loggerObj = {}; // Object to hold logging information
    loggerObj.api = loginApi; // Logging the API being accessed

    // Validate user_name
    if (
      req.body.user_name == null ||
      req.body.user_name == undefined ||
      req.body.user_name.length == 0
    ) {
      loggerObj.keyword = "user_name"; // Log keyword for identifying the field
      loggerObj.message = "user_name should not be empty"; // Log message for the error
      errorLoggerService.error(loggerObj); // Log the error
      objResponse.message = "user_name should not be empty"; // Set response message
      res.status(500).send(objResponse); // Send error response
      return; // Exit function
    }

    // Validate password
    if (
      req.body.password == null ||
      req.body.password == undefined ||
      req.body.password.length == 0
    ) {
      loggerObj.keyword = "password"; // Log keyword for identifying the field
      loggerObj.message = "password should not be empty"; // Log message for the error
      errorLoggerService.error(loggerObj); // Log the error
      objResponse.message = "password should not be empty"; // Set response message
      res.status(500).send(objResponse); // Send error response
      return; // Exit function
    }

    // Call login service
    userServiceManager.loginService(
      req.body,
      apiResponse,
      function (error, response) {
        if (error) {
          loggerObj.message = error.message; // Log the error message
          errorLoggerService.error(loggerObj); // Log the error
          return res.status(500).send(response); // Send error response
        } else {
          loggerObj.message = response.message; // Log the success message
          infoLoggerService.info(loggerObj); // Log the info
          return res.status(200).send(response); // Send success response
        }
      }
    );
  });

  /** Create User API */
  router.post(createApi, function (req, res) {
    var loggerObj = {}; // Object to hold logging information
    loggerObj.api = createApi; // Logging the API being accessed

    // Validate user_name
    if (
      req.body.user_name == null ||
      req.body.user_name == undefined ||
      req.body.user_name.length == 0
    ) {
      loggerObj.keyword = "user_name"; // Log keyword for identifying the field
      loggerObj.message = "user_name should not be empty"; // Log message for the error
      errorLoggerService.error(loggerObj); // Log the error
      objResponse.message = "user_name should not be empty"; // Set response message
      res.status(500).send(objResponse); // Send error response
      return; // Exit function
    }

    // Validate password
    if (
      req.body.password == null ||
      req.body.password == undefined ||
      req.body.password.length == 0
    ) {
      loggerObj.keyword = "password"; // Log keyword for identifying the field
      loggerObj.message = "password should not be empty"; // Log message for the error
      errorLoggerService.error(loggerObj); // Log the error
      objResponse.message = "password should not be empty"; // Set response message
      res.status(500).send(objResponse); // Send error response
      return; // Exit function
    }

    // Call insert user data service
    userServiceManager.insertUserData(
      req.body,
      apiResponse,
      function (error, response) {
        if (error) {
          loggerObj.message = error.message; // Log the error message
          errorLoggerService.error(loggerObj); // Log the error
          return res.status(500).send(response); // Send error response
        } else {
          loggerObj.message = response.message; // Log the success message
          infoLoggerService.info(loggerObj); // Log the info
          return res.status(200).send(response); // Send success response
        }
      }
    );
  });
}

// Exporting userApi function to be used in other modules
module.exports = {
  userApi,
};
