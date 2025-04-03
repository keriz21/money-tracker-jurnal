const api = "http://127.0.0.1:5000/api/"

function toggleMenu(formId) {
    const expense = document.getElementById("expenseContainer")
    const income = document.getElementById("incomeContainer")
    const transfer = document.getElementById("transferContainer")

    if (expense) expense.classList.add("hidden")
    if (income) income.classList.add("hidden")
    if (transfer) transfer.classList.add("hidden")

    const form = document.getElementById(formId)
    form.classList.remove("hidden")
}

function submitForm(formId) {
    const form = document.getElementById(formId);

    if (!form) {
        console.error('Form dengan ID "' + formId + '" tidak ditemukan.');
        return;
    }

    const formData = new FormData(form);
    const formObject = {}; 
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    const formJSON = JSON.stringify(formObject);
    console.log("Form ID: ", formId);
    console.log("Form Data: ", formJSON);
    
    if (formId = "expenseForm") {
        fetch(api + "expense", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: formJSON
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            alert("Expense added successfully!");
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    } 
    if (formId = "incomeForm") {
        fetch(api + "income", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: formJSON
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            alert("Income added successfully!");
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }
}
