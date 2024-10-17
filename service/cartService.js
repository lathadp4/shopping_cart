// Importing the cart controller to interact with cart data
const controller = require("../controller/cartController");
const cartControllerObj = new controller.cartController();

function cartService() {
    /** 
     * Fetch all cart items based on the given query condition.
     * 
     * @param {Object} queryContion - The condition to filter the cart items.
     * @param {Object} apiResponse - The response object to be modified based on the operation result.
     * @param {Function} callback - The callback function to return the response.
     */
    this.fetchAllCartItem = function (queryContion, apiResponse, callback) {
        return cartControllerObj
            .getFilteredDataWithCondition(queryContion)
            .then(function (response) {
                // Check if the response is empty
                if (response.length == 0) {
                    apiResponse.status = false;
                    apiResponse.message = "Cart Data not found";
                    apiResponse.data = response;
                    callback(null, apiResponse);
                } else {
                    apiResponse.status = true;
                    apiResponse.message = "Cart Data";
                    apiResponse.data = response;
                    callback(null, apiResponse);
                }
            })
            .catch(function (err) {
                // Handle any errors that occur during the fetch operation
                apiResponse.status = false;
                apiResponse.message = "Failed to get data";
                apiResponse.data = {};
                callback(err, apiResponse);
            });
    };
    /** End of fetchAllCartItem function */

    /** 
     * Insert new data into the cart or update the quantity of an existing item.
     * 
     * @param {Object} cartObj - The object representing the cart item to be inserted/updated.
     * @param {Object} apiResponse - The response object to be modified based on the operation result.
     * @param {Function} callback - The callback function to return the response.
     */
    this.insertDataToCart = function (cartObj, apiResponse, callback) {
        return cartControllerObj.getFilteredDataWithCondition(cartObj).then((responseData) => {
            // If no existing cart item is found, create a new one
            if (responseData.length == 0) {
                return cartControllerObj
                    .createCartData(cartObj)
                    .then(function (response) {
                        apiResponse.status = true;
                        apiResponse.message = "Inserted successfully";
                        apiResponse.data = response;
                        callback(null, apiResponse);
                    })
                    .catch(function (err) {
                        // Handle errors during insertion
                        apiResponse.status = false;
                        apiResponse.message = "Failed to insert";
                        apiResponse.data = err;
                        callback(err, apiResponse);
                    });
            } else {
                // If item exists, update the quantity
                var updateQuantity = { product_quantity: responseData[0].product_quantity + 1 };
                return cartControllerObj
                    .updateCartData(updateQuantity, { id: responseData[0].id })
                    .then(function (response) {
                        apiResponse.status = true;
                        apiResponse.message = "Updated successfully";
                        apiResponse.data = response;
                        callback(null, apiResponse);
                    })
                    .catch(function (err) {
                        // Handle errors during update
                        apiResponse.status = false;
                        apiResponse.message = "Failed to insert";
                        apiResponse.data = err;
                        callback(err, apiResponse);
                    });
            }
        });
    };
    /** End of insertDataToCart function */

    /** 
     * Update existing cart data based on given conditions.
     * 
     * @param {Object} cartObj - The object containing updated cart data.
     * @param {Object} condition - The condition to identify which cart item to update.
     * @param {Object} apiResponse - The response object to be modified based on the operation result.
     * @param {Function} callback - The callback function to return the response.
     */
    this.updateDataToCart = function (cartObj, condition, apiResponse, callback) {
        return cartControllerObj
            .updateCartData(cartObj, condition)
            .then(function (response) {
                // Check if any rows were affected (updated)
                if (response[0] >= 1) {
                    apiResponse.status = true;
                    apiResponse.message = "Updated successfully";
                    apiResponse.data = response;
                    callback(null, apiResponse);
                } else {
                    apiResponse.status = false;
                    apiResponse.message = "Cart data not found";
                    apiResponse.data = response;
                    callback(null, apiResponse);
                }
            })
            .catch(function (err) {
                // Handle errors during update
                apiResponse.status = false;
                apiResponse.message = "Failed to update";
                apiResponse.data = err;
                callback(err, apiResponse);
            });
    };
    /** End of updateDataToCart function */

    /** 
     * Delete cart data based on given conditions.
     * 
     * @param {Object} condition - The condition to identify which cart item to delete.
     * @param {Object} apiResponse - The response object to be modified based on the operation result.
     * @param {Function} callback - The callback function to return the response.
     */
    this.deleteCartData = function (condition, apiResponse, callback) {
        return cartControllerObj
            .deleteCartData(condition)
            .then(function (response) {
                // Check if any rows were affected (deleted)
                if (response == 0) {
                    apiResponse.status = false;
                    apiResponse.message = "Cart data not found";
                    apiResponse.data = response;
                    callback(null, apiResponse);
                } else {
                    apiResponse.status = true;
                    apiResponse.message = "Deleted successfully";
                    apiResponse.data = response;
                    callback(null, apiResponse);
                }
            })
            .catch(function (err) {
                // Handle errors during deletion
                apiResponse.status = false;
                apiResponse.message = err.message;
                apiResponse.data = err;
                callback(err, apiResponse);
            });
    };
    /** End of deleteCartData function */
}

// Exporting the cartService module
module.exports = {
    cartService,
};
