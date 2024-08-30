

let elregisterForm = document.querySelector('.register-form')

elregisterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    
   if(username === "admin" && password === "123") {
        elregisterForm.lastElementChild.innerHTML = `
         <img class="mx-auto scale-[1.5] hover:bg-#0D9488" src="./images/loading.png" alt="Loading" width="40">
    `;
        setTimeout(() => {
            location.pathname = "../../index.html";
        }, 1000);
    } 
    else {
        alert("Invalid username or password!");
    }
});