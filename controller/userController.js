(function () {
  "use strict"; // Enforcing strict mode for safer JavaScript code execution

  // Importing database handler for interacting with the database
  const databaseHandler = require("../databaseLayer/databaseHandler"),
    userHandler = new databaseHandler.DatabaseHandler(); // Creating an instance of the database handler
  const tableName = "tbl_user"; // Defining the user table name

  function userController() {
    /** 
     * Check if user exists based on the provided query condition 
     */
    this.getFilteredDataWithCondition = function (queryCondition) {
      // Fetching filtered data from the user table based on the condition
      return userHandler.getFilteredDataWithCondition(
        tableName,
        queryCondition
      );
    };

    /** 
     * Create a new user in the database 
     */
    this.createUserData = function (userObj) {
      // Inserting a new user object into the user table
      return userHandler.create(userObj, tableName);
    };
  }

  // Exporting the userController function to be used in other modules
  module.exports = { userController };
})();
