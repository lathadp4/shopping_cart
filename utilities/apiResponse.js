function ApiResponse() {
  this.status = true;
  this.message = "";
  // this.data = null;

  /**
   * The function used to get the success json response data .
   */
  this.getOkResponse = function () {
    return this.toJsonString();
  };

  this.getErrorResponse = function () {
    this.status = false;
    this.data = [];
    return this;
  };

  /**
   * The function used to convert  the data into json string .
   */
  this.toJsonString = function () {
    return JSON.stringify(this);
  };
}

// export the class
module.exports = { ApiResponse };
