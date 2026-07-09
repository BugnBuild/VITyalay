document.getElementById('submit').addEventListener('click', function() {
    const title = document.getElementById('title').value.trim();
    const body = document.getElementById('body').value.trim();

    if (!title || !body) {
        alert('Please fill in both the Title and Body fields.');
    } else {
        alert('Your question has been submitted successfully!');
    }
});
