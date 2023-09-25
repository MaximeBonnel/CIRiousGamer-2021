let SignUp = document.getElementById("register");
let User = document.getElementById("username");
let UserFeedBack = document.getElementById("usernameFeedback");
let Pass = document.getElementById("password");
let PassFeedBack = document.getElementById("passwordFeedback");

SignUp.addEventListener('submit', event => {
    event.preventDefault();

    // Le nom d'utilisateur doit être de plus de 5 caractères
    if (User.value.length > 4) {
        User.classList.remove("is-invalid");

        // Le mot de passe doit être de plus de 5 caractères
        if (Pass.value.length > 4) {

            // Si le nom d'utilisateur exite déjà
            socket.emit("usernameExist", User.value);
            socket.on("usernameExistRep", res => {
                if (!res) {
                    socket.emit("username", User.value);
                    socket.on("resultUser", res => {
                        socket.emit("crypt", Pass.value);
                        socket.on("resultCrypt", res => {
                            socket.emit("register", [User.value, res]);
                            logger.sendLogin(User.value);
                            window.location.href = "/loading";
                        });
                    });
                } else {
                    User.classList.add("is-invalid");
                    Pass.classList.remove("is-invalid");
                    UserFeedBack.innerHTML = "Le nom d'utilisateur existe déjà";
                }
            });
        } else {
            Pass.classList.add("is-invalid");
            PassFeedBack.innerHTML = "Le mot de passe doit être d'au moins 5 caractères";
        }
    } else {
        User.classList.add("is-invalid");
        Pass.classList.remove("is-invalid");
        UserFeedBack.innerHTML = "Le nom d'utilisateur doit être d'au moins 5 caractères";
    }
});