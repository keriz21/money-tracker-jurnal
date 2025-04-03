const apiUrl = "http://127.0.0.1:5000/api/"

function show_table(tableID){
    const expenseTable = document.getElementById("insight-expense")
    const incomeTable = document.getElementById("insight-income")

    if (expenseTable) expenseTable.classList.add("hidden")
    if (incomeTable) incomeTable.classList.add("hidden")

    const table = document.getElementById(tableID)
    table.classList.remove("hidden")
}

async function fetchDataIncome() {
    try {
        const response = await fetch(apiUrl + "get_income_data")
        if (!response.ok) {
            throw new Error("Network response was not ok")
        }
        const data = await response.json()
        return data;
    } catch (error) {
        console.error("Error fetching data:", error)
        throw error; // Rethrow the error to be handled by the caller
    }
}

async function fetchDataExpense() {
    try {
        const response = await fetch(apiUrl + "get_expense_data")
        if (!response.ok) {
            throw new Error("Network response was not ok")
        }
        const data = await response.json()
        return data;
    } catch (error) {
        console.error("Error fetching data:", error)
        throw error; // Rethrow the error to be handled by the caller
    }
}

async function fetchDataInsight() {
    try {
        const response = await fetch(apiUrl + "get_insights_money")
        if (!response.ok) {
            throw new Error("Network response was not ok")
        }
        const data = await response.json()
        return data;
    } catch (error) {
        console.error("Error fetching data:", error)
        throw error; // Rethrow the error to be handled by the caller
    }
}

function populateTable(data) {
    const tableBody = document.querySelector("#expense-body-item")
    tableBody.innerHTML = "" // Clear existing rows

    data.forEach((item) => {
        const row = document.createElement("tr")
        row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.category}</td>
            <td>${item.amount}</td>
            <td>${item.asset}</td>
            <td>${item.note}</td>

        `
        tableBody.appendChild(row)
    })
}

function populateTableIncome(data) {
    const tableBody = document.querySelector("#income-body-item")
    tableBody.innerHTML = "" // Clear existing rows

    data.forEach((item) => {
        const row = document.createElement("tr")
        row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.category}</td>
            <td>${item.amount}</td>
            <td>${item.asset}</td>
            <td>${item.note}</td>

        `
        tableBody.appendChild(row)
    })
}

function populateTableInsight(data) {
    // Pastikan elemen yang dimaksud ada di DOM
    const tableBody = document.querySelector("#insight-money");
    if (!tableBody) {
      console.error("Element with id 'insight-money' not found!");
      return;
    }
  
    // Bersihkan isi tabel sebelumnya
    tableBody.innerHTML = "";
  
    // Buat baris tabel baru
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.total_expense}</td>
      <td>${data.total_income}</td>
      <td>${data.money_left}</td>
    `;
  
    // Tambahkan baris ke body tabel
    tableBody.appendChild(row);
  }

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const data = await fetchDataExpense()
        populateTable(data)

        const dataIncome = await fetchDataIncome()
        populateTableIncome(dataIncome)

        const dataInsight = await fetchDataInsight()
        populateTableInsight(dataInsight)

        console.log(dataInsight)
    } catch (error) {
        console.error("Error fetching data:", error)
    }
});