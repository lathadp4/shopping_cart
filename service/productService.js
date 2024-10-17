// Importing the necessary product controller
const controller = require("../controller/productController");
const productsControllerObj = new controller.productController(); // Creating an instance of the product controller

function productService() {
    /** 
     * Get product data service
     * 
     * This method retrieves product data based on the provided conditions.
     * It updates the API response object and calls the provided callback 
     * with the results or an error.
     */
    this.getProductData = function (productsObj, apiResponse, callback) {
        // Call the controller method to fetch filtered product data
        return productsControllerObj
            .getFilteredDataWithCondition(productsObj)
            .then(function (response) {
                // Successful data retrieval
                apiResponse.status = true; // Indicate success
                apiResponse.message = "Product Data"; // Success message
                apiResponse.data = response; // Attach the retrieved data
                callback(null, apiResponse); // Call the callback with the response
            })
            .catch(function (err) {
                // Handle errors during data retrieval
                apiResponse.status = false; // Indicate failure
                apiResponse.message = "Failed to get data"; // Error message
                apiResponse.data = err; // Attach error details
                callback(err, apiResponse); // Call the callback with the error
            });
    };
    /**end here */
}

// Exporting the productService for use in other modules
module.exports = {
    productService,
};
