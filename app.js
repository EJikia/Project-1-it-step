/*Login & Registration Pages*/
function openLogInForm() {
    disappearForm("login_form", "register_form");

}

function openRegistrationForm() {
    disappearForm("register_form", "login_form");

}
function disappearForm(elementToShow, elementToDisappear) {

    document.getElementById("main_container").style.opacity = "0.3";
    if (document.getElementById(elementToDisappear).style.display !== "none") {
        document.getElementById(elementToDisappear).style.display = "none";
    }
    let element = document.getElementById(elementToShow);
    element.style.display = "flex"
}
/*================= register user ===================*/
let register_form = document.getElementById("register_form");
register_form.addEventListener("submit", (e) => {
    e.preventDefault();
    let formElements = e.target.elements;
    let userObj = {};
    for (let element of formElements) {
        if (element.tagName === "INPUT") {
            userObj[element.name] = element.value;
        }
    }
    if (userObj.fname == "" || userObj.lname == "" || userObj.email == "" || userObj.password == "") {
        alert("Please fill all required fields!")
        return;
    }
    if (userObj.password !== userObj.re_password) {
        alert("Passwords Don't Match");
        return;
    }

    else {
        let usersArrayString = localStorage.getItem("users");
        let parsedArray = JSON.parse(usersArrayString);

        if (!parsedArray) {
            parsedArray = [];
        }

        for (let user of parsedArray) {
            if (user.email === userObj.email) {
                alert("USER ALREADY EXISTS")
                return;
            }
        }

        parsedArray.push(userObj)
        let newArrayString = JSON.stringify(parsedArray);
        localStorage.setItem("users", newArrayString);
        alert("User Registered");
        openLogInForm();

    }
});
/*================= register user ===================*/
function login() {
    let login_form = document.getElementById("login_form");
    let email = login_form.querySelector("input[name='email']");
    let password = login_form.querySelector("input[name='password']");
    let usersString = localStorage.getItem("users");
    let usersObjects = JSON.parse(usersString);

    if (!usersObjects) {
        usersObjects = [];
    }

    console.log(email.value, password.value);

    for (let user of usersObjects) {
        console.log(user);
        if (user.email === email.value && user.password === password.value) {
            password.style.border = "none";
            email.style.border = "none";
            document.getElementById("login_form").style.display = "none";
            document.getElementsByClassName("header-btn")[0].style.display = "none";
            document.getElementsByClassName("header-btn")[1].style.display = "none";
            let username = document.getElementById("username");
            username.style.display = "inline-block";
            username.textContent = user.fname;
            let logout = document.getElementById("logout-btn");
            logout.style.display = "inline-block";
            document.getElementById("main_container").style.opacity = "1";
            return;
        }
        if (user.email === email.value && user.password !== password.value) {
            alert("Incorrect Parameters");
            password.style.border = "solid #FF0000";
            return;
        }

    }

    password.style.border = "solid #FF0000";
    email.style.border = "solid #FF0000";

    alert("Incorrect Parameters");

}