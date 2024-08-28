

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    
    if(username === "admin" && password === "123") {
        location.pathname = "../../admin.html"
        alert("Login successful!");
    } else {
        alert("Invalid username or password!");
    }
});