const { Sequelize } = require('sequelize');

// Create Sequelize instance for MySQL
const sequelize = new Sequelize('htsdb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // Set to true for debugging SQL queries
});

// Test Database Connection
sequelize.authenticate()
    .then(() => console.log('✅ MySQL Database Connected'))
    .catch(err => console.error('❌ Error connecting to database:', err));

module.exports = sequelize;
