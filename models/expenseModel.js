const pool = require("../db");

const addExpenseModel = async (expense) => {

    const { description, amount, category, type } = expense;

    const query = `
        INSERT INTO ExpenseTracker(description, amount, category, type)
        VALUES($1, $2, $3, $4)
    `;

    await pool.query(query, [
        description,
        amount,
        category,
        type
    ]);
};

const getExpensesModel = async () => {

    const result = await pool.query(
        "SELECT * FROM ExpenseTracker"
    );

    return result.rows;
};

const deleteExpenseModel = async (id) => {

    await pool.query(
        "DELETE FROM ExpenseTracker WHERE sno = $1",
        [id]
    );

};

module.exports = {
    addExpenseModel,
    getExpensesModel,
    deleteExpenseModel
};