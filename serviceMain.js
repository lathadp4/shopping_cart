"use strict"; // Enforces strict mode to catch common coding errors

// Increase the maximum number of event listeners to infinity to avoid warnings/errors from too many listeners being added
require("events").EventEmitter.defaultMaxListeners = Infinity;

// Import the apiServer module from a local file (./apiServer.js)
var apiServerModule = require("./apiServer.js");

// Create an instance of the apiServer from the imported module
var apiServerInstance = new apiServerModule.apiServer();

