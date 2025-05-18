const api = 'http://127.0.0.1:5000/ai/parse_transaction'

function submitCreative(formId) {
    const form = document.getElementById(formId);

    if (!form) {
        console.error('Form with ID "' + formId + '" not found.');
        return;
    }

    const formData = new FormData(form);
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value.trim(); // Hapus spasi ekstra
    });

    if (!formObject['text']) { // Cek apakah kosong atau null
        alert("Please fill in the text field.");
        return;
    }

    const formJSON = JSON.stringify(formObject);

    console.log("Form ID: ", formId);
    console.log("Form Data: ", formJSON);
    console.log("hello world");

    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: formJSON
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
        alert("Data parsed successfully!");
        window.location.href = "/fe_v1/tabel.html"; // Redirect to the same page
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}
