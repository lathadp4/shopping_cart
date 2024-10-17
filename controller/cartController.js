(function () {
    "use strict";

    // Importing the database handler to interact with the database
    const databaseHandler = require("../databaseLayer/databaseHandler"),
        cartHandler = new databaseHandler.DatabaseHandler();
    const tableName = "tbl_cart"; // Define the table name for the cart

    function cartController() {

        /** 
         * Get filtered cart data based on a given query condition.
         * 
         * @param {Object} queryCondition - The condition to filter the cart items.
         * @returns {Promise} - A promise that resolves with the filtered cart data.
         */
        this.getFilteredDataWithCondition = function (queryCondition) {
            return cartHandler.getFilteredDataWithCondition(
                tableName,
                queryCondition
            );
        };

        /** 
         * Create new cart data.
         * 
         * @param {Object} cartObj - The object representing the cart data to be created.
         * @returns {Promise} - A promise that resolves with the created cart data.
         */
        this.createCartData = function (cartObj) {
            return cartHandler.create(cartObj, tableName);
        };

        /** 
         * Update existing cart data.
         * 
         * @param {Object} cartObj - The object containing updated cart data.
         * @param {Object} condition - The condition to identify which cart item to update.
         * @returns {Promise} - A promise that resolves with the result of the update operation.
         */
        this.updateCartData = function (cartObj, condition) {
            cartObj.updatedDate = new Date(); // Set the updated date to the current date
            return cartHandler.update(cartObj, condition, tableName);
        };

        /** 
         * Delete cart data based on given conditions.
         * 
         * @param {Object} condition - The condition to identify which cart item to delete.
         * @returns {Promise} - A promise that resolves with the result of the delete operation.
         */
        this.deleteCartData = function (condition) {
            return cartHandler.delete(condition, tableName);
        };
    }

    // Exporting the cartController module
    module.exports = { cartController };
})();
