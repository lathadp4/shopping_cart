// Export a function that defines the 'tbl_cart' model
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "tbl_cart", // Name of the model
        {
            // Define the attributes of the 'tbl_cart' model
            id: {
                type: DataTypes.BIGINT, // Data type for the ID
                primaryKey: true, // This field is the primary key
                autoIncrement: true, // Automatically increment the ID value
            },
            user_id: {
                type: DataTypes.BIGINT, // Data type for user ID
                required: true // This field is required
            },
            product_title: {
                type: DataTypes.STRING, // Data type for the product title
                allowNull: false // This field cannot be null
            },
            product_price: {
                type: DataTypes.DECIMAL, // Data type for product price
                allowNull: false // This field cannot be null
            },
            product_description: {
                type: DataTypes.STRING, // Data type for the product description
                allowNull: false // This field cannot be null
            },
            product_image: {
                type: DataTypes.STRING, // Data type for product image URL or path
                allowNull: true // This field can be null (optional)
            },
            product_quantity: {
                type: DataTypes.BIGINT, // Data type for the quantity of the product
                default: 1, // Default value is 1 if not specified
            },
            createdDate: {
                type: DataTypes.DATE, // Data type for the creation date
                defaultValue: DataTypes.NOW, // Default value is the current date/time
            },
        },
        {
            // Additional model options
            tableName: "tbl_cart", // Specifies the name of the table in the database
            timestamps: false, // Disable automatic timestamp fields (createdAt, updatedAt)
        }
    );
};
