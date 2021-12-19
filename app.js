var loggedInUser = {};
/*Login & Registration Pages*/
function openLogInForm() {
    disappearForm("login_form", "register_form");

}

function openRegistrationForm() {
    disappearForm("register_form", "login_form");

}
function disappearForm(elementToShow, elementToDisappear) {

    document.getElementById("homepage_container").style.opacity = "0.3";
    if (document.getElementById(elementToDisappear).style.display !== "none") {
        document.getElementById(elementToDisappear).style.display = "none";
    }
    let element = document.getElementById(elementToShow);
    element.style.display = "flex";
}


/*================= user register  ===================*/
let register_form = document.getElementById("register_form");
if (register_form != null) {
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
}

/*================= user register  ===================*/

/*================= user login ===================*/
function login() {
    let login_form = document.getElementById("login_form");
    let email = login_form.querySelector("input[name='email']");
    let password = login_form.querySelector("input[name='password']");
    let usersString = localStorage.getItem("users");
    let usersObjects = JSON.parse(usersString);

    if (!usersObjects) {
        usersObjects = [];
    }

    let user = usersObjects.find(x => x.email === email.value);
    if (user == null) {
        password.style.border = "solid #FF0000";
        email.style.border = "solid #FF0000";
        alert("Incorrect parameters");
        return;
    }
    if (user.password != password.value) {
        alert("Incorrect password");
        password.style.border = "solid #FF0000";
        return;
    }
    password.style.border = "none";
    email.style.border = "none";
    document.getElementById("login_form").style.display = "none";
    document.getElementsByClassName("header-btn")[0].style.display = "none";
    document.getElementsByClassName("header-btn")[1].style.display = "none";
    loggedInUser = { ...user };
    let username = document.getElementById("username");
    username.style.display = "inline-block";
    username.textContent = user.fname;
    let logout = document.getElementById("logout-btn");
    logout.style.display = "inline-block";
    document.getElementById("homepage_container").style.opacity = "1";

};
/*================= user login ===================*/

/*================= user log out ===================*/
function logout() {

    document.getElementsByClassName("header-btn")[0].style.display = "inline-block";
    document.getElementsByClassName("header-btn")[1].style.display = "inline-block";
    let username = document.getElementById("username");
    username.style.display = "none";
    username.textContent = "";
    let logout = document.getElementById("logout-btn");
    logout.style.display = "none";

};

/*================= user log out ===================*/
/*================= user page ===================*/

function showPassword() {
    let password = document.getElementById("userInfo_password");
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
};

function loadUserPage() {
    document.getElementById("homepage_container").style.display = "none";
    document.getElementById("userInfo_container").style.display = "flex";
    document.getElementById("userInfo_firstname").value = loggedInUser.fname;
    document.getElementById("userInfo_lastname").value = loggedInUser.lname;
    document.getElementById("userInfo_email").value = loggedInUser.email;
    document.getElementById("userInfo_password").value = loggedInUser.password;
};

function changeInfo() {
    document.getElementById("userInfo_firstname").disabled = false;
    document.getElementById("userInfo_lastname").disabled = false;
    document.getElementById("userInfo_password").disabled = false;
    document.getElementById("saveUpdatedUserInfo").disabled = false;
    document.getElementById("changeUserInfo").disabled = true;
};

function updateInfo() {
    let usersString = localStorage.getItem("users");
    let usersObjects = JSON.parse(usersString);
    let user = usersObjects.find(x => x.email === loggedInUser.email);
    user.fname = document.getElementById("userInfo_firstname").value;
    user.lname = document.getElementById("userInfo_lastname").value;
    user.password = document.getElementById("userInfo_password").value;
    var newArrayString = JSON.stringify(usersObjects);
    localStorage.setItem("users", newArrayString);
    document.getElementById("changeUserInfo").disabled = false;
    document.getElementById("userInfo_firstname").disabled = true;
    document.getElementById("userInfo_lastname").disabled = true;
    document.getElementById("userInfo_password").disabled = true;
    document.getElementById("saveUpdatedUserInfo").disabled = true;
};
/*================= user page ===================*/

/*================= Hotels ===================*/
class Hotel {
    constructor(name, address, numberOfStars, info, numberOfRooms, freeRooms, parking, swimmingPool, spa, bannerImgSrc) {
        this.name = name;
        this.address = address;
        this.numberOfStars = numberOfStars;
        this.info = info;
        this.numberOfRooms = numberOfRooms;
        this.freeRooms = freeRooms;
        this.parking = parking;
        this.swimmingPool = swimmingPool;
        this.spa = spa;
        this.bannerImgSrc = bannerImgSrc;
    }
}

let orbiCitySeaView = new Hotel("Orbi city sea view", "New Boulevard, Batumi", 4,
    "Studio Apartment with Sea View", 100, 30, "Yes", "Yes", "No", "./img/hotels/achara/Orbi city sea view/1.jpg");
let paragraphResortAndSpaShekvetili = new Hotel("Paragraph Resort & Spa Shekvetili, Autograph Collection", "New Boulevard, Batumi", 5,
    "Studio Apartment with Sea View", 200, 10, "Yes", "Yes", "Yes", "./img/hotels/guria/Paragraph Resort & Spa Shekvetili, Autograph Collection/1.jpg");
let prometheusEpicHotelAndSpa = new Hotel("Prometheus Epic Hotel & Spa", "New Boulevard, Batumi", 5,
    "Studio Apartment with Sea View", 150, 15, "Yes", "Yes", "Yes", "./img/hotels/imereti/Prometheus Epic Hotel & Spa/1.jpg");
let lopotaLakeResortAndSpa = new Hotel("Lopota Lake Resort & Spa", "New Boulevard, Batumi", 3,
    "Studio Apartment with Sea View", 165, 25, "Yes", "Yes", "No", "./img/hotels/kakheti/Lopota Lake Resort & Spa/1.jpg");
let roomsHotelKazbegi = new Hotel("Rooms Hotel Kazbegi", "New Boulevard, Batumi", 3,
    "Studio Apartment with Sea View", 60, 14, "Yes", "Yes", "Yes", "./img/hotels/mtskheta-mtianeti/Rooms Hotel Kazbegi/1.jpg");
let mtserlebiResort = new Hotel("Mtserlebi Resort", "New Boulevard, Batumi", 4,
    "Studio Apartment with Sea View", 90, 17, "Yes", "Yes", "No", "./img/hotels/shida-kartli/Mtserlebi Resort/1.jpg");

let hotels = [orbiCitySeaView, paragraphResortAndSpaShekvetili,
    prometheusEpicHotelAndSpa, lopotaLakeResortAndSpa, roomsHotelKazbegi, mtserlebiResort];
let hotelsArrayString = localStorage.getItem("hotels");
let hotelsParsedArray = JSON.parse(hotelsArrayString);
if (!hotelsParsedArray) {
    hotelsParsedArray = [];
    hotelsParsedArray.push(hotels);
    let hotelsNewArrayString = JSON.stringify(hotelsParsedArray);
    localStorage.setItem("hotels", hotelsNewArrayString);
}

hotels.forEach(hotel => {
    let hotel_card_wrapper = document.getElementById("hotel_card_wrapper");
    
    let card = document.createElement("div");
    card.className = "card";
    let cardTitle = document.createElement("a");
    let cardBannerHref = document.createElement("a");
    let bannerImg = document.createElement("img");
    let cardParagraph = document.createElement("p");

    
    cardTitle.textContent = hotel.name;
    bannerImg.src = hotel.bannerImgSrc;
    cardParagraph.textContent = hotel.info;

    hotel_card_wrapper.appendChild(card);
    card.appendChild(cardTitle);
    card.appendChild(cardBannerHref);
    cardBannerHref.appendChild(bannerImg);
    card.appendChild(cardParagraph);
    


});


/*================= Hotels ===================*/
