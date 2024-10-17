// Importing the necessary modules and services
const productService = require("../service/productService"); // Importing the product service
const productServiceManager = new productService.productService(); // Creating an instance of the product service
const ApiResponse = require("../utilities/apiResponse"); // Importing the API response utility
const apiResponse = new ApiResponse.ApiResponse(); // Creating an instance of the API response
const LoggerServiceModule = require("../utilities/logger"); // Importing the logger utility
const infoLoggerService = LoggerServiceModule.info_logger; // Instance for logging info messages
const errorLoggerService = LoggerServiceModule.error_logger; // Instance for logging error messages

function productApi(router) {
    var productApi = "/getProducts"; // Defining the endpoint for getting products

    /** 
     * Get product details API
     * 
     * This endpoint retrieves product details from the product service and sends
     * back a response to the client. It logs any errors or successful responses.
     */
    router.get(productApi, function (req, res) {
        var loggerObj = {}; // Object to hold logging information
        loggerObj.api = productApi; // Log the API being called

        // Call the product service to get product data
        productServiceManager.getProductData(
            {}, // No specific query conditions provided
            apiResponse, // Pass the API response object
            function (error, response) {
                // Callback function to handle the response or error
                if (error) {
                    loggerObj.message = error.message; // Log the error message
                    errorLoggerService.error(loggerObj); // Log the error using the error logger
                    return res.status(500).send(response); // Send back a 500 response with the error details
                } else {
                    loggerObj.message = response.message; // Log the successful response message
                    infoLoggerService.info(loggerObj); // Log the success using the info logger
                    return res.status(200).send(response); // Send back a 200 response with the product data
                }
            }
        );
    });
}

// Exporting the productApi function for use in other modules
module.exports = {
    productApi,
};
