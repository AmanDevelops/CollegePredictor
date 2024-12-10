document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    sessionStorage.setItem('formData', JSON.stringify(data));
    window.location.href = 'results.html';
});
