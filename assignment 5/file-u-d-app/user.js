// user.js
const Sequelize = require('sequelize');
const sequelize = new Sequelize('your_database', 'your_user', 'your_password', {
    host: 'localhost',
    dialect: 'mysql',
});

const User = sequelize.define('User', {
    username: {
        type: Sequelize.STRING,
        unique: true,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
    password: Sequelize.STRING,
});

module.exports = User;
