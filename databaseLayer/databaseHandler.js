"use strict"; // Enforcing strict mode for safer JavaScript execution

// Importing the models for database interactions
var MODELS = require("../model/index");

function DatabaseHandler() {
  /** 
   * Create a new record in the specified collection 
   * @param {Object} collectionObject - The data to be inserted
   * @param {string} collectionName - The name of the collection (table)
   * @param {Object} [trnsctn] - Optional transaction object for database operations
   */
  this.create = function (collectionObject, collectionName, trnsctn) {
    var collection = MODELS[collectionName]; // Accessing the collection model
    var data = collection.create(collectionObject, { transaction: trnsctn }); // Creating a new record
    return data; // Returning the created data
  };

  /** 
   * Update an existing record in the specified collection 
   * @param {Object} collectionObj - The new data for the update
   * @param {Object} condition - The condition to find the record to update
   * @param {string} collectionName - The name of the collection (table)
   */
  this.update = function (collectionObj, condition, collectionName) {
    var updateObj = MODELS[collectionName]; // Accessing the collection model
    var updateData = updateObj.update(collectionObj, {
      where: condition,
      plain: true, // Return only a single instance
    });
    return updateData; // Returning the result of the update
  };

  /** 
   * Delete records from the specified collection 
   * @param {Object} condition - The condition to find the records to delete
   * @param {string} collectionName - The name of the collection (table)
   * @param {Object} [trnsctn] - Optional transaction object for database operations
   */
  this.delete = function (condition, collectionName, trnsctn) {
    var deleteObj = MODELS[collectionName]; // Accessing the collection model
    var deleteData = deleteObj.destroy(
      { where: condition }, // Condition for deletion
      { transaction: trnsctn } // Optional transaction
    );
    return deleteData; // Returning the result of the deletion
  };

  /** 
   * Get data from the specified collection with offset, limit, and order 
   * @param {string} collectionName - The name of the collection (table)
   * @param {Object} condition - The condition to filter records
   * @param {number} offset - The number of records to skip
   * @param {number} limit - The maximum number of records to return
   * @param {Array} order - The order of the returned records
   */
  this.getFilteredDataWithOffsetLimit = function (
    collectionName,
    condition,
    offset,
    limit,
    order
  ) {
    var collection = MODELS[collectionName]; // Accessing the collection model
    return collection.findAll({
      where: condition, // Condition for filtering records
      limit: limit, // Maximum number of records to return
      offset: offset, // Number of records to skip
      order: order, // Order of the returned records
    });
  };

  /** 
   * Get data from the specified collection with required attributes, offset, limit, and order 
   * @param {string} collectionName - The name of the collection (table)
   * @param {Object} condition - The condition to filter records
   * @param {Array} attributes - The attributes to be selected
   * @param {number} offset - The number of records to skip
   * @param {number} limit - The maximum number of records to return
   * @param {Array} order - The order of the returned records
   */
  this.getFilteredDataWithOffsetLimitAttributes = function (
    collectionName,
    condition,
    attributes,
    offset,
    limit,
    order
  ) {
    var collection = MODELS[collectionName]; // Accessing the collection model
    return collection.findAll({
      attributes: attributes, // Attributes to select
      where: condition, // Condition for filtering records
      limit: limit, // Maximum number of records to return
      offset: offset, // Number of records to skip
      order: order, // Order of the returned records
    });
  };

  /** 
   * Get all data from the specified collection by applying where conditions 
   * @param {string} collectionName - The name of the collection (table)
   * @param {Object} condition - The condition to filter records
   */
  this.getFilteredDataWithCondition = function (collectionName, condition) {
    var collection = MODELS[collectionName]; // Accessing the collection model
    return collection.findAll({
      where: condition, // Condition for filtering records
      order: [["id", "DESC"]], // Ordering by ID in descending order
    });
  };
}

// Exporting the DatabaseHandler function to be used in other modules
module.exports = {
  DatabaseHandler,
};
