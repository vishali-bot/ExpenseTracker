const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "mca",
    password: "Vishali2004@",
    port: 5432
});

pool.connect()
.then(() => {
    console.log("Database connected successfully");
})
.catch((err) => {
    console.log(err.message);
});

module.exports = pool;