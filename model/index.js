// Include Sequelize module
"use strict";
const Sequelize = require("sequelize"); // Import Sequelize for ORM functionality
var fs = require("fs"); // File system module for reading files
var path = require("path"); // Path module for handling and transforming file paths
var useTransaction = require("sequelize-transactions"); // Library for handling transactions in Sequelize
var basename = path.basename(module.filename); // Get the current module's base filename
const db = {}; // Initialize an object to hold database models

// Create a new Sequelize instance for connecting to the database
let sequelize;
sequelize = new Sequelize(
  "mysql://root:latha123@127.0.0.1:3306/shopping_cart", // Connection string
  {
    timezone: "+00:00", // Set timezone for the connection
    pool: { // Connection pool settings
      max: 100, // Maximum number of connections in the pool
      min: 0, // Minimum number of connections in the pool
      acquire: 30000, // Maximum time (in ms) to try to get a connection before throwing an error
      idle: 10000, // Maximum time (in ms) a connection can be idle before being released
    },
    dialect: "mysql", // Specify the database dialect
    dialectOptions: {
      multipleStatements: true, // Allow multiple SQL statements in a single query
    },
  }
);
useTransaction(sequelize); // Enable transaction handling for the Sequelize instance

// Authenticate the connection to the database
sequelize
  .authenticate()
  .then(function (err) {
    console.log("Connection has been established successfully."); // Log success message
  })
  .catch(function (err) {
    console.log("Unable to connect to the database:", err); // Log error message if connection fails
  });

// Read all model files in the current directory
fs.readdirSync(__dirname)
  .filter(function (file) {
    // Filter out files that are not JavaScript files or that should be ignored
    return (
      file.indexOf(".") !== 0 && // Ignore hidden files
      file !== basename && // Ignore the current file
      file.slice(-3) === ".js" && // Only include JavaScript files
      !file.startsWith("Trace_") // Ignore files that start with 'Trace_'
    );
  })
  .forEach(function (file) {
    // Import each model and add it to the db object
    var model = require(path.join(__dirname, file))(sequelize, Sequelize); // Initialize model with sequelize instance
    db[model.name] = model; // Store model in db object with its name as key
  });

// Immediately-invoked function expression (IIFE) to maintain module scope
(function (m) { })(module.exports);

// Export the sequelize instance for creating models in other files
db.sequelize = sequelize; // Attach the sequelize instance to the db object

module.exports = db; // Export the db object containing models and the sequelize instance
