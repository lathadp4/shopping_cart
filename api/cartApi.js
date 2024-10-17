const cartService = require("../service/cartService"); // Importing the cart service
const cartServiceManager = new cartService.cartService(); // Creating an instance of the cart service
const ApiResponse = require("../utilities/apiResponse"); // Importing API response utility
const apiResponse = new ApiResponse.ApiResponse(); // Creating an instance of API response utility
const LoggerServiceModule = require("../utilities/logger"); // Importing the logger utility
const infoLoggerService = LoggerServiceModule.info_logger; // Logger for info messages
const errorLoggerService = LoggerServiceModule.error_logger; // Logger for error messages

function cartApi(router) {
    // Defining API endpoints
    var createApi = "/addProductToCart";
    var updateApi = "/updateProductQuantity/:id";
    var deleteApi = "/removeProductFromTheCart";
    var getApi = "/getCartItems";
    var objResponse = { status: false }; // Default response object

    /** Get cart details */
    router.get(getApi, function (req, res) {
        var loggerObj = {};
        loggerObj.api = getApi;

        // Check for user_id in query parameters
        if (
            req.query.user_id == null ||
            req.query.user_id == undefined ||
            req.query.user_id.length == 0
        ) {
            loggerObj.keyword = "user_id";
            loggerObj.message = "user_id should not be empty";
            errorLoggerService.error(loggerObj); // Logging the error
            objResponse.message = "user_id should not be empty";
            res.status(500).send(objResponse); // Sending error response
            return;
        }

        // Fetch all cart items for the user
        cartServiceManager.fetchAllCartItem(
            req.query,
            apiResponse,
            function (error, response) {
                if (error) {
                    loggerObj.message = error.message;
                    errorLoggerService.error(loggerObj); // Logging the error
                    res.status(500).send(response); // Sending error response
                } else {
                    loggerObj.message = response.message;
                    infoLoggerService.info(loggerObj); // Logging info message
                    res.status(200).send(response); // Sending success response
                }
            }
        );
    });

    /** Create cart API */
    router.post(createApi, function (req, res) {
        var loggerObj = {};
        loggerObj.api = createApi;
        loggerObj.user_name = req.body.user_name;

        // Validate product_title
        if (
            req.body.product_title == null ||
            req.body.product_title == undefined ||
            req.body.product_title.length == 0
        ) {
            loggerObj.keyword = "product_title";
            loggerObj.message = "product_title should not be empty";
            errorLoggerService.error(loggerObj); // Logging the error
            objResponse.message = "product_title should not be empty";
            res.status(500).send(objResponse); // Sending error response
            return;
        }

        // Validate product_price
        if (
            req.body.product_price == null ||
            req.body.product_price == undefined ||
            req.body.product_price.length == 0
        ) {
            loggerObj.keyword = "product_price";
            loggerObj.message = "product_price should not be empty";
            errorLoggerService.error(loggerObj); // Logging the error
            objResponse.message = "product_price should not be empty";
            res.status(500).send(objResponse); // Sending error response
            return;
        }

        // Validate product_description
        if (
            req.body.product_description == null ||
            req.body.product_description == undefined ||
            req.body.product_description.length == 0
        ) {
            loggerObj.keyword = "product_description";
            loggerObj.message = "product_description should not be empty";
            errorLoggerService.error(loggerObj); // Logging the error
            objResponse.message = "product_description should not be empty";
            res.status(500).send(objResponse); // Sending error response
            return;
        }

        // Validate product_image
        if (
            req.body.product_image == null ||
            req.body.product_image == undefined ||
            req.body.product_image.length == 0
        ) {
            loggerObj.keyword = "product_image";
            loggerObj.message = "product_image should not be empty";
            errorLoggerService.error(loggerObj); // Logging the error
            objResponse.message = "product_image should not be empty";
            res.status(500).send(objResponse); // Sending error response
            return;
        }

        // Validate user_id
        if (
            req.body.user_id == null ||
            req.body.user_id == undefined ||
            req.body.user_id.length == 0
        ) {
            loggerObj.keyword = "user_id";
            loggerObj.message = "user_id should not be empty";
            errorLoggerService.error(loggerObj); // Logging the error
            objResponse.message = "user_id should not be empty";
            res.status(500).send(objResponse); // Sending error response
            return;
        }

        // Insert data into the cart
        cartServiceManager.insertDataToCart(
            req.body,
            apiResponse,
            function (error, response) {
                if (error) {
                    loggerObj.message = error.message;
                    errorLoggerService.error(loggerObj); // Logging the error
                    res.status(500).send(response); // Sending error response
                } else {
                    loggerObj.message = response.message;
                    infoLoggerService.info(loggerObj); // Logging info message
                    res.status(200).send(response); // Sending success response
                }
            }
        );
    });

    /** Update cart API */
    router.put(updateApi, function (req, res) {
        var loggerObj = {};
        loggerObj.api = updateApi;
        loggerObj.user_name = req.body.user_name;

        // Validate product_quantity
        if (
            req.body.product_quantity == null ||
            req.body.product_quantity == undefined ||
            req.body.product_quantity.length == 0
        ) {
            loggerObj.keyword = "product_quantity";
            loggerObj.message = "product_quantity should not be empty";
            errorLoggerService.error(loggerObj); // Logging the error
            objResponse.message = "product_quantity should not be empty";
            res.status(500).send(objResponse); // Sending error response
            return;
        }

        // Update data in the cart
        cartServiceManager.updateDataToCart(
            req.body,
            { id: req.params.id }, // Using id from URL parameters
            apiResponse,
            function (error, response) {
                if (error) {
                    loggerObj.message = error.message;
                    errorLoggerService.error(loggerObj); // Logging the error
                    res.status(500).send(response); // Sending error response
                } else {
                    loggerObj.message = response.message;
                    infoLoggerService.info(loggerObj); // Logging info message
                    res.status(200).send(response); // Sending success response
                }
            }
        );
    });

    /** Delete items from the cart */
    router.delete(deleteApi + "/:id", function (req, res) {
        var loggerObj = {};
        loggerObj.api = deleteApi;

        // Validate id from URL parameters
        if (
            req.params.id == null ||
            req.params.id == undefined ||
            req.params.id.length == 0
        ) {
            loggerObj.keyword = "id";
            loggerObj.message = "id should not be empty";
            errorLoggerService.error(loggerObj); // Logging the error
            objResponse.message = "id should not be empty";
            res.status(500).send(objResponse); // Sending error response
            return;
        }

        // Delete data from the cart
        cartServiceManager.deleteCartData(
            { id: req.params.id }, // Using id from URL parameters
            apiResponse,
            function (error, response) {
                if (error) {
                    loggerObj.message = error.message;
                    errorLoggerService.error(loggerObj); // Logging the error
                    res.status(500).send(response); // Sending error response
                } else {
                    loggerObj.message = response.message;
                    infoLoggerService.info(loggerObj); // Logging info message
                    res.status(200).send(response); // Sending success response
                }
            }
        );
    });
    /** End here */

    /** Delete all items from the cart */
    router.delete(deleteApi, function (req, res) {
        var loggerObj = {};
        loggerObj.api = deleteApi;

        // Delete all data from the cart
        cartServiceManager.deleteCartData(
            {}, // No condition to delete all items
            apiResponse,
            function (error, response) {
                if (error) {
                    loggerObj.message = error.message;
                    errorLoggerService.error(loggerObj); // Logging the error
                    res.status(500).send(response); // Sending error response
                } else {
                    loggerObj.message = response.message;
                    infoLoggerService.info(loggerObj); // Logging info message
                    res.status(200).send(response); // Sending success response
                }
            }
        );
    });
}

// Exporting the cartApi function to be used in other modules
module.exports = {
    cartApi,
};
