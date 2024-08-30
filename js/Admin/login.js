

let elLoginForm = document.getElementById('loginForm');
console.log(elLoginForm.lastElementChild);


elLoginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if(username === "admin" && password === "123") {
        elLoginForm.lastElementChild.innerHTML = `
         <img class="mx-auto scale-[1.5] hover:bg-#0D9488" src="./images/loading.png" alt="Loading" width="40">
    `;
        setTimeout(() => {
            location.pathname = "../../admin.html";
        }, 1000);
    } 
    else {
        alert("Invalid username or password!");
    }
});
