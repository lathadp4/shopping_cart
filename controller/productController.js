(function () {
    "use strict"; // Enforce strict mode for better error checking

    // Importing the database handler module and creating an instance for product data handling
    const databaseHandler = require("../databaseLayer/databaseHandler"),
        productsHandler = new databaseHandler.DatabaseHandler();
    const tableName = "tbl_products"; // Define the table name for product data

    function productController() {
        /** 
         * Get product details based on specific conditions
         * 
         * This method retrieves filtered product data from the database
         * according to the provided query condition.
         */
        this.getFilteredDataWithCondition = function (queryCondition) {
            // Call the database handler to get filtered data for products
            return productsHandler.getFilteredDataWithCondition(
                tableName, // The table to query
                queryCondition // The conditions to apply when querying
            );
        };

        this.updateProductInfo = function (updateObj, condition) {
            return productsHandler.update(updateObj, condition, tableName);
        }
    }

    // Exporting the productController for use in other modules
    module.exports = { productController };
})();
