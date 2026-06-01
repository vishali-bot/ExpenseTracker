
let transactions = [];
let selectedType = "";


function setType(type) {
  selectedType = type;

  document.getElementById("income").style.background = "";
  document.getElementById("Expense").style.background = "";

  if (type === "Income") {
    document.getElementById("income").style.background = "green";
  } else {
    document.getElementById("Expense").style.background = "red";
  }
}

async function show() {



  const description = document.getElementById("description").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const result = document.getElementById("result");

  if (!description) {
    document.getElementById('result').innerHTML = "Enter description";
    return;
  }

  if (amount == "" || isNaN(amount) || amount <= 0) {
    document.getElementById("result").innerHTML = "Enter valid amount";
    return;
  }

  if (selectedType === "") {
    document.getElementById("result").innerHTML= "Select Income or Expense";
    return;
  }
else{
     document.getElementById("result").innerHTML = "";
}


  const transaction = {
    id: Date.now(),
    description,
    amount,
    type: selectedType,
    category
  };

  
  // new
try {

    await axios.post("/expenses/add", {
        description,
        amount,
        category,
        type: selectedType
    });

    console.log("Inserted into database");

} catch (err) {

    console.log(err);

} //new

 loadTransactions();

  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
}

async function deleteTransaction(id) {

    try {

        console.log("Deleting:", id);

        const response = await axios.delete(`/expenses/${id}`);

        console.log(response.data);

        loadTransactions();

    } catch (err) {

        console.error(err);

    }

}

function updateSummary() {

  let income = 0;
  let expense = 0;

  transactions.forEach(t => {

    if (t.type === "Income") {
      income += Number(t.amount);
    }
    else {
      expense += Number(t.amount);
    }

  });

  const balance = income - expense;

  document.getElementById("totalIncome").innerText =
  "₹" + income.toFixed(2);

  document.getElementById("totalExpenses").innerText =
  "₹" + expense.toFixed(2);

  document.getElementById("Balance").innerText =
  "₹" + balance.toFixed(2);
}

async function loadTransactions() {
  try {

    const response = await axios.get("/expenses");

    console.log("Data from database:", response.data);

    transactions = response.data;

    renderTransactions();

  } catch (err) {

    console.log(err);

  }
}

function renderTransactions() {

    const list = document.getElementById("Transactions");
    const emptyMsg = document.getElementById("emptyMessage");
    const filterValue = document.getElementById("filter").value;

    list.innerHTML = "";

    let filteredTransactions = transactions;

    if (filterValue === "Income") {

        filteredTransactions = transactions.filter(
            t => t.type === "Income"
        );

    } else if (filterValue === "Expense") {

        filteredTransactions = transactions.filter(
            t => t.type === "Expense"
        );

    }

    if (filteredTransactions.length === 0) {
        emptyMsg.style.display = "block";
    } else {
        emptyMsg.style.display = "none";
    }

    filteredTransactions.slice().reverse().forEach(t => {

        const li = document.createElement("li");

        li.innerHTML = `
            ${t.description} - ${t.category} - ₹${t.amount}
            <button onclick="deleteTransaction(${t.sno})">X</button>
        `;

        list.appendChild(li);

    });

    updateSummary();
}
loadTransactions();