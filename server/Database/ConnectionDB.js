const mysql = require("mysql2/promise");

const ConnectionDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ecommerce'
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

