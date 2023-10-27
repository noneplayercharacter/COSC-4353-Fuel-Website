const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

async function getClientInfo() {
    const [rows] = await pool.query("SELECT * from client_information");
    return rows;
}

async function createClient(user_name, user_password) {
    const [result] = await pool.query(`INSERT INTO user_info (user_name, user_password)
    VALUES (?, ?)`, [user_name, user_password]);
    return {
        id: result.insertId,
        user_name,
        user_password
    };
}

// Perform the createClient operation
/*(async () => {
    try {
        const result = await createClient('Steve Carrell', '111 Kicking n Screaming', 'apt #333', 'Lake Jimmy', 'TX', '33211');
        console.log(result);
    } catch (error) {
        console.error("Error creating client:", error);
    }
})();*/

module.exports = {
    getClientInfo,
    createClient
};
