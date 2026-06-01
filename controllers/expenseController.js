const {
    addExpenseModel,
    getExpensesModel,
    deleteExpenseModel
} = require("../models/expenseModel");

const addExpense = async (req, res) => {

    try {

        await addExpenseModel(req.body);

        res.send("Expense Added");

    } catch (err) {

        res.status(500).send(err.message);
    }
};

const getExpenses = async (req, res) => {

    try {

        const expenses = await getExpensesModel();

        res.json(expenses);

    } catch (err) {

        res.status(500).send(err.message);
    }
};

const deleteExpense = async (req, res) => {

    try {

        await deleteExpenseModel(req.params.id);

        res.json({ message: "Deleted" });

    } catch (err) {

        res.status(500).send(err.message);

    }

};

module.exports = {
    addExpense,
    getExpenses,
    deleteExpense
};