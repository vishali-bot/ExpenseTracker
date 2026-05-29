const express = require("express");
require("./db");
const cors = require("cors");

const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

app.use("/expenses", expenseRoutes);

app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
});