const controller = require("../controller/userController"); // Importing user controller to handle user-related database operations
const userControllerObj = new controller.userController(); // Creating an instance of user controller
const { Op } = require("sequelize"); // Importing Sequelize operators for building query conditions
var bcrypt = require("bcryptjs"); // Importing bcrypt for password hashing and validation
var jwt = require("jsonwebtoken"); // Importing jsonwebtoken for generating authentication tokens
require("dotenv").config(); // Loading environment variables from a .env file

function userService() {
  /** Login API service */
  this.loginService = function (query, apiResponse, callback) {
    // Defining the condition to find user by username
    var condition = { user_name: query.user_name };

    return userControllerObj
      .getFilteredDataWithCondition(condition) // Fetching user data based on the condition
      .then(function (response) {
        // Check if the user exists
        if (response.length == 0) {
          var err = { message: "User Does not exist" }; // Error message if user does not exist
          apiResponse.status = false;
          apiResponse.message = "User Does not exist"; // Setting the API response status and message
          apiResponse.data = [];
          callback(err, apiResponse); // Calling the callback with error and response
        } else {
          // Validate the provided password against the hashed password
          let passwordIsValid = bcrypt.compareSync(
            query.password,
            response[0].password
          );

          // Check if the password is valid
          if (!passwordIsValid) {
            var err = { message: "Incorrect password" }; // Error message for incorrect password
            apiResponse.status = false;
            apiResponse.message = "Incorrect password"; // Setting the API response status and message
            apiResponse.data = [];
            callback(err, apiResponse); // Calling the callback with error and response
          } else {
            // Generate JWT token for the authenticated user
            var jsontoken = jwt.sign(
              { id: response[0].id }, // Payload containing user ID
              process.env.refreshKey, // Secret key from environment variables
              {
                expiresIn: "2h", // Token expiration time
              }
            );
            apiResponse.status = true; // Setting API response status to true
            apiResponse.message = "Login successful"; // Setting success message
            apiResponse.data = { response: response[0], token: jsontoken }; // Including user data and token in the response
            callback(null, apiResponse); // Calling the callback with null error and response
          }
        }
      })
      .catch(function (err) {
        // Handle errors during the fetching process
        apiResponse.status = false;
        apiResponse.message = "Failed to get data"; // Setting error message
        apiResponse.data = {};
        callback(err, apiResponse); // Calling the callback with error and response
      });
  };
  /** End of Login API service */


  /** Create User API service */
  this.insertUserData = function (userObj, apiResponse, callback) {
    // Hashing the password before storing it
    var salt = bcrypt.genSaltSync(10); // Generating salt for hashing
    userObj.password = bcrypt.hashSync(userObj.password, salt); // Hashing the password

    return userControllerObj
      .createUserData(userObj) // Creating new user data in the database
      .then(function (response) {
        apiResponse.status = true; // Setting API response status to true
        apiResponse.message = "Inserted successfully"; // Setting success message
        apiResponse.data = response; // Including response data
        callback(null, apiResponse); // Calling the callback with null error and response
      })
      .catch(function (err) {
        // Handle errors during the user creation process
        apiResponse.status = false;
        apiResponse.message = "Failed to insert"; // Setting error message
        apiResponse.data = err; // Including error details in the response
        callback(err, apiResponse); // Calling the callback with error and response
      });
  };
  /** End of Create User API service */
}

// Exporting the userService function to be used in other modules
module.exports = {
  userService,
};
