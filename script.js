document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
    } else {
        alert('Signup successful!');
        // Redirect to the homepage
        window.location.href = 'index.html';
    }
});

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    alert(`Logged in with email: ${email}`);
    // Redirect to the homepage
    window.location.href = 'index.html';
});
