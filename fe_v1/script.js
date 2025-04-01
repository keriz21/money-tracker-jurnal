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
    console.log("Form Data: ", formJSON); // Log the JSON string to the console
}
