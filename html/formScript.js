document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Create a new FormData object
    const formData = new FormData(this);

    // Convert FormData to JSON
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Store data in session storage
    sessionStorage.setItem('formData', JSON.stringify(data));

    // Redirect to another page
    window.location.href = 'results.html'; // Replace with your response page
});
