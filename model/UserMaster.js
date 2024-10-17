// Export a function that defines the "tbl_user" model
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tbl_user", // Name of the model
    {
      id: {
        type: DataTypes.BIGINT, // Data type for the id field
        primaryKey: true, // Set this field as the primary key
        autoIncrement: true, // Automatically increment the id value
      },
      user_name: {
        type: DataTypes.STRING, // Data type for the user_name field
        allowNull: false, // user_name cannot be null
        required: false, // This property is not needed; Sequelize uses allowNull
      },
      password: {
        type: DataTypes.STRING, // Data type for the password field
        allowNull: false, // password cannot be null
        required: false, // This property is not needed; Sequelize uses allowNull
      },
      createdDate: {
        type: DataTypes.DATE, // Data type for the createdDate field
        defaultValue: DataTypes.NOW, // Set current timestamp by default
      },
    },
    {
      tableName: "tbl_user", // Name of the table in the database
      timestamps: false, // Disable automatic timestamp fields (createdAt, updatedAt)
    }
  );
};
