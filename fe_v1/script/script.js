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

    // Pastikan variabel 'api' sudah terdefinisi
    if (typeof api === "undefined") {
        console.error("API endpoint tidak ditemukan.");
        return;
    }

    let url = "";
    let successMessage = "";

    if (formId === "expenseForm") {
        url = api + "expense";
        successMessage = "Expense added successfully!";
    } else if (formId === "incomeForm") {
        url = api + "income";
        successMessage = "Income added successfully!";
    } else {
        console.error("Form ID tidak dikenali.");
        return;
    }

    // Fetch ke API
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: formJSON
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
        alert(successMessage);
        
        setTimeout(() => {
            console.log("Redirecting...");
            window.location.href = "tabel.html";
        }, 1000);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}
