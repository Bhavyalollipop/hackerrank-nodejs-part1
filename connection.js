const {Sequelize} = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
// const sequelize = new Sequelize({
//     // The `host` parameter is required for other databases
//     // host: 'localhost'
//     dialect: 'sqlite',
//     storage: './database.sqlite'
//   });
const BlogPosts = require('./models/posts');

return sequelize.authenticate()
    .then(result => {
        console.log(`SQLite successfully connected!`);
        return BlogPosts.sync({alter: true});
    })
    .then(result => {
        console.log(`Blog Posts table created`);
        return result;
    })
    .catch(error => {
        console.error('Unable to connect to SQLite database:', error);
    })
