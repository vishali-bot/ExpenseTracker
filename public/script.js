
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
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

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

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

  renderTransactions();

  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
}


function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderTransactions();
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


function renderTransactions() {

  const list = document.getElementById("Transactions");
  const emptyMsg = document.getElementById("addTransactions");

  list.innerHTML = "";

  if (transactions.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }

  transactions.slice().reverse().forEach(t => {

    const li = document.createElement("li");

    li.innerHTML = `
      ${t.description} - ${t.category} - ₹${t.amount}
      <button onclick="deleteTransaction(${t.id})">X</button>
    `;

    list.appendChild(li);
  });

  updateSummary();
}


renderTransactions();