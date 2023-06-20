const mysql = require("mysql2/promise");

const ConnectionDB = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: 'root',
    // database: 'test'
    host: 'db4free.net',
    user: 'ecommerce_2023',
    password: 'ecommerce_2023',
    database: 'ecommerce_2023'
});




module.exports = {
    getConnection: () => {
        return ConnectionDB;
    },
    testConnection: () =>{
        /*ConnectionDB.connect((error) => {
            if (error) {
                console.error('Error connecting to Database: ', error);
            } else {
                console.log('Connected to Database!');
            }
        });*/
    }

}

