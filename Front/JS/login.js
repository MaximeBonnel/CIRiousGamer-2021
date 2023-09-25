let SignIn = document.getElementById("login");
let User = document.getElementById("username");
let Pass = document.getElementById("password");

SignIn.addEventListener('submit', event => {
    event.preventDefault();

    // Vérification si le nom d'utilisateur existe
    socket.emit("usernameExist", User.value);
    socket.on("usernameExistRep", res => {
        if (res == true) {
            User.classList.remove("is-invalid");
        } else {
            User.classList.add("is-invalid");
        }
    })

    // Vérification du mot de passe
    socket.emit("password", [User.value]);
    socket.on("resultPass", res => {
        socket.emit("decrypt", [Pass.value, res]);
        socket.on("resultDecrypt", result => {
            if (result) {
                // Connexion !
                logger.sendLogin(User.value);
                window.location.href = "/loading";
            } else {
                Pass.classList.add("is-invalid");
            }
        });
    });
});