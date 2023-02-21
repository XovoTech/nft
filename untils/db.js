// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
//  'azuki',
//  'root',
//  'ahmad327',
//   {
//     host: 'localhost',
//     port:'3306',
//     dialect: 'mysql'
    
//   }
// );
// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//  }).catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//  });
// module.exports=sequelize;
const Mongoose=require('mongoose');
// Db Connection
Mongoose.set("strictQuery", false);
const mongoose=Mongoose.connect('mongodb://localhost:27017/azuki',{
    useNewUrlParser: true,
    
});
module.exports=mongoose;