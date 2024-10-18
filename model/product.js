// Export a function that defines the "tbl_products" model
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "tbl_products", // Name of the model
        {
            id: {
                type: DataTypes.INTEGER, // Data type for the id field
                autoIncrement: true, // Automatically increment the id value
                primaryKey: true // Set this field as the primary key
            },
            title: {
                type: DataTypes.STRING, // Data type for the title field
                allowNull: false // Title cannot be null
            },
            price: {
                type: DataTypes.DECIMAL, // Data type for the price field
                allowNull: false // Price cannot be null
            },
            description: {
                type: DataTypes.STRING, // Data type for the description field
                allowNull: false // Description cannot be null
            },
            image: {
                type: DataTypes.STRING, // Data type for the image field
                allowNull: true // Image can be null
            },
            rating: {
                type: DataTypes.DECIMAL, // Data type for the rating field
                allowNull: true // Rating can be null
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: true
            }

        }, {
        tableName: 'tbl_products', // Name of the table in the database
        timestamps: false // Disable automatic timestamp fields (createdAt, updatedAt)
    }
    );
};
