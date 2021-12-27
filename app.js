var loggedInUser = {};
// open homepage
function openHomePage() {
    document.getElementById("homeAndSearch_container").style.display = "block";
    document.getElementById("homepage_news").style.display = "block";
    document.getElementById("dynamicTitle").style.display = "block";
    document.getElementById("regions").style.display = "block";
    document.getElementById("hotelInfo_container").style.display = "none";
    document.getElementById("userInfo_container").style.display = "none";
    document.getElementById("searchBar_container").style.display = "none";
    document.getElementById("regLoginForm_container").style.display = "none";

    let searchedHotels = [...hotels];
    let allHotelCard = document.getElementById("hotel_card_wrapper");
    allHotelCard.remove();
    let hotelCards = document.getElementById("hotel_cards");
    let cardWrapper = document.createElement("div");
    cardWrapper.id = "hotel_card_wrapper";
    cardWrapper.className = "card-wrapper";
    hotelCards.appendChild(cardWrapper);
    searchedHotels.forEach(hotel => {
        let hotel_card_wrapper = document.getElementById("hotel_card_wrapper");

        let card = document.createElement("div");
        card.className = "card";
        let cardTitle = document.createElement("h4");
        let cardBannerHref = document.createElement("a");
        let bannerImg = document.createElement("img");
        bannerImg.onclick = function () { openHotelPage(hotel.id) };
        let cardList = document.createElement("ul");
        let addressListItem = document.createElement("li");


        cardTitle.textContent = hotel.name;
        bannerImg.src = hotel.bannerImg;
        addressListItem.textContent = [`location: ${hotel.address}`];

        hotel_card_wrapper.appendChild(card);
        card.appendChild(cardBannerHref);
        cardBannerHref.appendChild(bannerImg);
        card.appendChild(cardTitle);
        card.appendChild(cardList);
        cardList.appendChild(addressListItem);

    });
    document.getElementsByClassName("card")[2].style.display = "none";
    document.getElementsByClassName("card")[4].style.display = "none";
    document.getElementsByClassName("card")[6].style.display = "none";
    document.getElementsByClassName("card")[8].style.display = "none";
    document.getElementsByClassName("card")[12].style.display = "none";
    document.getElementsByClassName("card")[13].style.display = "none";


};

/*Login & Registration Pages*/
function openLogInForm() {
    disappearForm("login_form", "register_form");
}

function openRegistrationForm() {
    disappearForm("register_form", "login_form");

}
function disappearForm(elementToShow, elementToDisappear) {
    document.getElementById("regLoginForm_container").style.display = "block";
    document.getElementById("homeAndSearch_container").style.display = "none";
    document.getElementById("hotelInfo_container").style.display = "none";
    document.getElementById("userInfo_container").style.display = "none";
    document.getElementsByClassName("form-input")[0].value = "";
    document.getElementsByClassName("form-input")[1].value = "";
    document.getElementsByClassName("form-input")[2].value = "";
    document.getElementsByClassName("form-input")[3].value = "";
    if (document.getElementById(elementToDisappear).style.display !== "none") {
        document.getElementById(elementToDisappear).style.display = "none";
    }
    let element = document.getElementById(elementToShow);
    element.style.display = "flex";
}


/*================= user register  ===================*/
let register_form = document.getElementById("register_form");
let firstnameInput = document.getElementsByClassName("form-input")[0]
let lastnameInput = document.getElementsByClassName("form-input")[1]
let emailInput = document.getElementsByClassName("form-input")[2]
let passInput = document.getElementsByClassName("form-input")[3]
let validationMsg = document.getElementById("validation_msg");

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
        let dataIsvalid = true;

        firstnameInput.style.border = "none";
        lastnameInput.style.border = "none";
        emailInput.style.border = "none";
        passInput.style.border = "none";

        validationMsg.textContent = "";

        if (userObj.fname == "") {
            dataIsvalid = false;
            firstnameInput.style.border = "solid #FF0000";
        }
        if (userObj.lname == "") {
            dataIsvalid = false;
            lastnameInput.style.border = "solid #FF0000";
        }
        if (userObj.email == "") {
            dataIsvalid = false;
            emailInput.style.border = "solid #FF0000";
        }
        if (userObj.password == "") {
            dataIsvalid = false;
            passInput.style.border = "solid #FF0000";
        }
        if (!dataIsvalid) {
            validationMsg.textContent = "Please fill all required fields!";
            return;
        }

        let usersArrayString = localStorage.getItem("users");
        let parsedArray = JSON.parse(usersArrayString);

        if (!parsedArray) {
            parsedArray = [];
        }

        let existingUser = parsedArray.find(i => i.email == userObj.email);

        if (existingUser != null) {
            alert("USER ALREADY EXISTS")

            return;
        }

        if (parsedArray.length == 0) {

            userObj["id"] = 1;
        }
        else {
            parsedArray.sort((a, b) => b.id - a.id);
            userObj["id"] = parsedArray[0].id + 1;
        }

        parsedArray.push(userObj)
        let newArrayString = JSON.stringify(parsedArray);
        localStorage.setItem("users", newArrayString);
        alert("User Registered");
        openLogInForm();

    });
};


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
    document.getElementById("homeAndSearch_container").style.display = "block";
    openHomePage();
};


/*================= user log out ===================*/
function logout() {

    document.getElementsByClassName("header-btn")[0].style.display = "inline-block";
    document.getElementsByClassName("header-btn")[1].style.display = "inline-block";
    let username = document.getElementById("username");
    username.style.display = "none";
    username.textContent = "";
    let logout = document.getElementById("logout-btn");
    logout.style.display = "none";
    loggedInUser = {};

    window.location.href = "./index.html";


};
function closeForm() {
    window.location.href = "./index.html";
}

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
    document.getElementById("homeAndSearch_container").style.display = "none";
    document.getElementById("hotelInfo_container").style.display = "none";
    document.getElementById("regLoginForm_container").style.display = "none";
    document.getElementById("userInfo_container").style.display = "flex";
    document.getElementById("userInfo_firstname").value = loggedInUser.fname;
    document.getElementById("userInfo_lastname").value = loggedInUser.lname;
    document.getElementById("userInfo_email").value = loggedInUser.email;
    document.getElementById("userInfo_password").value = loggedInUser.password;


    let reservationData = document.getElementById("reservation_data");

    reservationData.remove();

    let bookingHistory = localStorage.getItem("reservations");
    let bookingParsedArray = JSON.parse(bookingHistory);


    if (!bookingParsedArray) {
        bookingParsedArray = [];

    }

    let userReservations = bookingParsedArray.filter(i => i.userId === loggedInUser.id);

    let reservation_table = document.getElementById("reservation_table");
    let tBodyElement = document.createElement("tbody");
    tBodyElement.id = "reservation_data";
    reservation_table.appendChild(tBodyElement);

    userReservations.forEach(data => {

        data.selectedRooms.forEach(element => {
            let table_row = document.createElement("tr");
            table_row.className = "reservationTable-row";
            tBodyElement.appendChild(table_row);

            let name_data = document.createElement("td");
            name_data.textContent = data.hotelName;
            name_data.className = "table-data";
            table_row.appendChild(name_data);

            let address_data = document.createElement("td");
            address_data.textContent = data.hotelAddress;
            address_data.className = "table-data";
            table_row.appendChild(address_data);

            let type_data = document.createElement("td");
            type_data.textContent = element.type;
            type_data.className = "table-data";
            table_row.appendChild(type_data);

            let number_data = document.createElement("td");
            number_data.textContent = element.number;
            number_data.className = "table-data";
            table_row.appendChild(number_data);

            let price_data = document.createElement("td");
            price_data.textContent = element.price;
            price_data.className = "table-data";
            table_row.appendChild(price_data);

            let checkin_data = document.createElement("td");
            checkin_data.textContent = data.checkInDate;
            checkin_data.className = "table-data";
            table_row.appendChild(checkin_data);

            let checkout_data = document.createElement("td");
            checkout_data.textContent = data.checkOutDate;
            checkout_data.className = "table-data";
            table_row.appendChild(checkout_data);
        })
    })
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


/*================= Hotels ===================*/
class Hotel {
    constructor(id, price, roomType, bannerImg, name, address, numberOfStars, numberOfRooms, maxNumberOfGuest,
        childPolicies, parking, swimmingPool, spa, fitness, internet, city, img_galery) {
        this.id = id;
        this.price = price;
        this.roomType = roomType;
        this.bannerImg = bannerImg;
        this.name = name;
        this.address = address;
        this.numberOfStars = numberOfStars;
        this.numberOfRooms = numberOfRooms;
        this.maxNumberOfGuest = maxNumberOfGuest;
        this.childPolicies = childPolicies;
        this.parking = parking;
        this.swimmingPool = swimmingPool;
        this.spa = spa;
        this.fitness = fitness;
        this.internet = internet;
        this.city = city;
        this.img_galery = img_galery;

    }
}

let orbiCitySeaView = new Hotel(1, [10, 15], ["single room", "double room"], "./img/hotels-banner/orbi.jpg", "Orbi city sea view", "9 Sherif Khimshiashvili Street, Batumi, Georgia", 4,
    100, 200, "Children of any age are welcome.Children aged 6 years and above are considered adults at this property. Accommodation for children under 6 - free",
    "Yes", "Yes", "No", "No", "Yes", "Batumi",
    ["./img/hotels/achara/Orbi city sea view/1.jpg", "./img/hotels/achara/Orbi city sea view/2.jpg",
        "./img/hotels/achara/Orbi city sea view/3.jpg", "./img/hotels/achara/Orbi city sea view/4.jpg",
        "./img/hotels/achara/Orbi city sea view/5.jpg"]);
let paragraphResortAndSpaShekvetili = new Hotel(2, [20, 25], ["single room", "double room"], "./img/hotels-banner/paragraph.jpg", "Paragraph Resort & Spa Shekvetili, Autograph Collection", "Highway E70, Shekvetili Beach, 3521 Shekhvetili, Georgia",
    5, 70, 150, "Children of any age are welcome.Children aged 6 years and above are considered adults at this property. Accommodation for children under 6 - free",
    "Yes", "Yes", "Yes", "Yes", "Yes", "Shekvetili",
    ["./img/hotels/guria/Paragraph Resort & Spa Shekvetili, Autograph Collection/1.jpg", "./img/hotels/guria/Paragraph Resort & Spa Shekvetili, Autograph Collection/2.jpg",
        "./img/hotels/guria/Paragraph Resort & Spa Shekvetili, Autograph Collection/3.jpg", "./img/hotels/guria/Paragraph Resort & Spa Shekvetili, Autograph Collection/4.jpg",
        "./img/hotels/guria/Paragraph Resort & Spa Shekvetili, Autograph Collection/5.jpg"]);
let prometheusEpicHotelAndSpa = new Hotel(3, [30, 35], ["single room", "double room"], "./img/hotels-banner/prometheus.jpg", "Prometheus Epic Hotel & Spa", "Village Kvilishori, 5420 Tskaltubo, Georgia",
    4, 50, 100, "Children of any age are welcome.Children aged 6 years and above are considered adults at this property. Accommodation for children under 6 - free",
    "Yes", "No", "No", "No", "Yes", "Tskaltubo",
    ["./img/hotels/imereti/Prometheus Epic Hotel & Spa/1.jpg", "./img/hotels/imereti/Prometheus Epic Hotel & Spa/2.jpg",
        "./img/hotels/imereti/Prometheus Epic Hotel & Spa/3.jpg", "./img/hotels/imereti/Prometheus Epic Hotel & Spa/4.jpg",
        "./img/hotels/imereti/Prometheus Epic Hotel & Spa/5.jpg"]);
let lopotaLakeResortAndSpa = new Hotel(4, [40, 45], ["single room", "double room"], "./img/hotels-banner/lopota.jpg", "Lopota Lake Resort & Spa", "Lopota, 2200 Napareuli, Georgia",
    3, 60, 120, "Children of any age are welcome.Children aged 6 years and above are considered adults at this property. Accommodation for children under 6 - free",
    "Yes", "Yes", "No", "No", "Yes", "Napareuli",
    ["./img/hotels/kakheti/Lopota Lake Resort & Spa/1.jpg", "./img/hotels/kakheti/Lopota Lake Resort & Spa/2.jpg",
        "./img/hotels/kakheti/Lopota Lake Resort & Spa/3.jpg", "./img/hotels/kakheti/Lopota Lake Resort & Spa/4.jpg",
        "./img/hotels/kakheti/Lopota Lake Resort & Spa/5.jpg"]);
let roomsHotelKazbegi = new Hotel(5, [50, 55], ["single room", "double room"], "./img/hotels-banner/rooms.jpg", "Rooms Hotel Kazbegi", "V. Gorgasali Street 1, Stepantsminda , 4700 Stepantsminda, Georgia",
    3, 60, 120, "Children of any age are welcome.Children aged 6 years and above are considered adults at this property. Accommodation for children under 6 - free",
    "No", "Yes", "No", "Yes", "No", "Stepantsminda",
    ["./img/hotels/mtskheta-mtianeti/Rooms Hotel Kazbegi/1.jpg", "./img/hotels/mtskheta-mtianeti/Rooms Hotel Kazbegi/2.jpg",
        "./img/hotels/mtskheta-mtianeti/Rooms Hotel Kazbegi/3.jpg", "./img/hotels/mtskheta-mtianeti/Rooms Hotel Kazbegi/4.jpg",
        "./img/hotels/mtskheta-mtianeti/Rooms Hotel Kazbegi/5.jpg"]);
let mtserlebiResort = new Hotel(6, [60, 65], ["single room", "double room"], "./img/hotels-banner/mtserlebi.jpg", "Mtserlebi Resort", "Mtserlebi, 5707 Kvishkheti, Georgia", 4,
    90, 120, "Children of any age are welcome.Children aged 6 years and above are considered adults at this property. Accommodation for children under 6 - free",
    "Yes", "Yes", "No", "No", "Yes", "Kvishkheti",
    ["./img/hotels/shida-kartli/Mtserlebi Resort/1.jpg", "./img/hotels/shida-kartli/Mtserlebi Resort/2.jpg",
        "./img/hotels/shida-kartli/Mtserlebi Resort/3.jpg", "./img/hotels/shida-kartli/Mtserlebi Resort/4.jpg",
        "./img/hotels/shida-kartli/Mtserlebi Resort/5.jpg"]);
let wyndhamBatumi = new Hotel(7, [70, 75], ["single room", "double room"], "./img/hotels-banner/wyndham.jpg", "Wyndham Batumi", "33 Memed Abashidze Avenue, 6000 Batumi, Georgia", 4,
    57, 100, "Children of any age are welcome.Children aged 6 years and above are considered adults at this property. Accommodation for children under 6 - free",
    "Yes", "Yes", "No", "No", "No", "Batumi",
    ["./img/hotels/achara/Wyndham Batumi/1.jpg", "./img/hotels/achara/Wyndham Batumi/2.jpg",
        "./img/hotels/achara/Wyndham Batumi/3.jpg", "./img/hotels/achara/Wyndham Batumi/4.jpg",
        "./img/hotels/achara/Wyndham Batumi/5.jpg"]);
let newportHotelKutaisi = new Hotel(8, [80, 85], ["single room", "double room"], "./img/hotels-banner/newport.jpg", "Newport Hotel Kutaisi", "1 Newport Street, 4600 Kutaisi, Georgia", 4,
    40, 82, "Children of any age are welcome.Children aged 6 years and above are considered adults at this property. Accommodation for children under 6 - free",
    "Yes", "No", "No", "No", "Yes", "Kutaisi",
    ["./img/hotels/imereti/Newport Hotel Kutaisi/1.jpg", "./img/hotels/imereti/Newport Hotel Kutaisi/2.jpg",
        "./img/hotels/imereti/Newport Hotel Kutaisi/3.jpg", "./img/hotels/imereti/Newport Hotel Kutaisi/4.jpg",
        "./img/hotels/imereti/Newport Hotel Kutaisi/5.jpg"]);
let ambassadoriKachreti = new Hotel(9, [90, 95], ["single room", "double room"], "./img/hotels-banner/ambassadori.jpg", "Ambassadori Kachreti Golf Resort", "Gurjaani Region, Kakheti, 1510 Kachreti, Georgia", 5,
    104, 140, "Children of any age are welcome. Children aged 6 years and above are considered adults at this property. Accommodation for children under 6 - free",
    "Yes", "Yes", "Yes", "Yes", "Yes", "Kachreti",
    ["./img/hotels/kakheti/Ambassadori Kachreti Golf Resort/1.jpg", "./img/hotels/kakheti/Ambassadori Kachreti Golf Resort/2.jpg",
        "./img/hotels/kakheti/Ambassadori Kachreti Golf Resort/3.jpg", "./img/hotels/kakheti/Ambassadori Kachreti Golf Resort/4.jpg",
        "./img/hotels/kakheti/Ambassadori Kachreti Golf Resort/5.jpg"]);
let gudauriInn = new Hotel(10, [11, 21], ["single room", "double room"], "./img/hotels-banner/gudauri.jpg", "Gudauri Inn", "Daba Gudauri, 4702 Gudauri, Georgia", 4,
    41, 75, "Children of any age are welcome.Children aged 6 years and above are considered adults at this property. Accommodation for children under 6 - free",
    "Yes", "Yes", "No", "Yes", "Yes", "Gudauri",
    ["./img/hotels/mtskheta-mtianeti/Gudauri Inn/1.jpg", "./img/hotels/mtskheta-mtianeti/Gudauri Inn/2.jpg",
        "./img/hotels/mtskheta-mtianeti/Gudauri Inn/3.jpg", "./img/hotels/mtskheta-mtianeti/Gudauri Inn/4.jpg",
        "./img/hotels/mtskheta-mtianeti/Gudauri Inn/5.jpg"]);
let iberiaPalaceHotel = new Hotel(11, [12, 22], ["single room", "double room"], "./img/hotels-banner/iberia.jpg", "Iberia Palace Hotel", "Kikalishvili Str. 6, 2100 Zugdidi, Georgia", 4,
    25, 40, "Children of any age are welcome.Children aged 6 years and above are considered adults at this property. Accommodation for children under 6 - free",
    "No", "Yes", "No", "No", "Yes", "Zugdidi",
    ["./img/hotels/samegrelo-zemoSvaneti/Iberia Palace Hotel/1.jpg", "./img/hotels/samegrelo-zemoSvaneti/Iberia Palace Hotel/2.jpg",
        "./img/hotels/samegrelo-zemoSvaneti/Iberia Palace Hotel/3.jpg", "./img/hotels/samegrelo-zemoSvaneti/Iberia Palace Hotel/4.jpg",
        "./img/hotels/samegrelo-zemoSvaneti/Iberia Palace Hotel/5.jpg"]);
let suntowerHotel = new Hotel(12, [13, 23], ["single room", "double room"], "./img/hotels-banner/suntower.jpg", "Suntower Hotel", "I.Gabliani st.#14E building, 3200 Mestia, Georgia", 4,
    90, 17, "Children of any age are welcome.Children aged 6 years and above are considered adults at this property. Accommodation for children under 6 - free",
    "Yes", "No", "No", "No", "Yes", "Mestia",
    ["./img/hotels/samegrelo-zemoSvaneti/Suntower Hotel/1.jpg", "./img/hotels/samegrelo-zemoSvaneti/Suntower Hotel/2.jpg",
        "./img/hotels/samegrelo-zemoSvaneti/Suntower Hotel/3.jpg", "./img/hotels/samegrelo-zemoSvaneti/Suntower Hotel/4.jpg",
        "./img/hotels/samegrelo-zemoSvaneti/Suntower Hotel/5.jpg"]);
let radissonBluIveria = new Hotel(13, [14, 24], ["single room", "double room"], "./img/hotels-banner/radisson.jpg", "Radisson Blu Iveria Hotel", "1 First Republic Square, Mtatsminda , 0108 Tbilisi City, Georgia",
    5, 117, 200, "Children of any age are welcome.Children aged 6 years and above are considered adults at this property. Accommodation for children under 6 - free",
    "Yes", "Yes", "Yes", "Yes", "Yes", "Tbilisi",
    ["./img/hotels/tbilisi/Radisson Blu Iveria Hotel/1.jpg", "./img/hotels/tbilisi/Radisson Blu Iveria Hotel/2.jpg",
        "./img/hotels/tbilisi/Radisson Blu Iveria Hotel/3.jpg", "./img/hotels/tbilisi/Radisson Blu Iveria Hotel/4.jpg",
        "./img/hotels/tbilisi/Radisson Blu Iveria Hotel/5.jpg"]);
let sheratonMetechiPalace = new Hotel(14, [15, 25], ["single room", "double room"], "./img/hotels-banner/sheraton.jpg", "Sheraton Grand Tbilisi Metechi Palace", "Telavi Street 20, 0103 Tbilisi City, Georgia",
    5, 77, 122, "Children of any age are welcome.Children aged 6 years and above are considered adults at this property. Accommodation for children under 6 - free",
    "Yes", "Yes", "Yes", "Yes", "Yes", "Tbilisi",
    ["./img/hotels/tbilisi/Sheraton Grand Tbilisi Metechi Palace/1.jpg", "./img/hotels/tbilisi/Sheraton Grand Tbilisi Metechi Palace/2.jpg",
        "./img/hotels/tbilisi/Sheraton Grand Tbilisi Metechi Palace/3.jpg", "./img/hotels/tbilisi/Sheraton Grand Tbilisi Metechi Palace/4.jpg",
        "./img/hotels/tbilisi/Sheraton Grand Tbilisi Metechi Palace/5.jpg"]);
//Save hotels in localstorage
let hotels = [orbiCitySeaView, paragraphResortAndSpaShekvetili,
    prometheusEpicHotelAndSpa, lopotaLakeResortAndSpa, roomsHotelKazbegi, mtserlebiResort,
    wyndhamBatumi, newportHotelKutaisi, ambassadoriKachreti,
    gudauriInn, iberiaPalaceHotel, suntowerHotel, radissonBluIveria, sheratonMetechiPalace];
let hotelsArrayString = localStorage.getItem("hotels");
let hotelsParsedArray = JSON.parse(hotelsArrayString);
if (!hotelsParsedArray) {
    hotelsParsedArray = [];
    hotelsParsedArray.push(hotels);
    let hotelsNewArrayString = JSON.stringify(hotelsParsedArray);
    localStorage.setItem("hotels", hotelsNewArrayString);
}
//create card for each hotel
hotels.forEach(hotel => {
    let hotel_card_wrapper = document.getElementById("hotel_card_wrapper");

    let card = document.createElement("div");
    card.className = "card";
    let cardTitle = document.createElement("h4");
    let cardBannerHref = document.createElement("a");
    let bannerImg = document.createElement("img");
    bannerImg.onclick = function () { openHotelPage(hotel.id) };
    let cardList = document.createElement("ul");
    let addressListItem = document.createElement("li");


    cardTitle.textContent = hotel.name;
    bannerImg.src = hotel.bannerImg;
    addressListItem.textContent = [`location: ${hotel.address}`];

    hotel_card_wrapper.appendChild(card);
    card.appendChild(cardBannerHref);
    cardBannerHref.appendChild(bannerImg);
    card.appendChild(cardTitle);
    card.appendChild(cardList);
    cardList.appendChild(addressListItem);

});
document.getElementsByClassName("card")[2].style.display = "none";
document.getElementsByClassName("card")[4].style.display = "none";
document.getElementsByClassName("card")[6].style.display = "none";
document.getElementsByClassName("card")[8].style.display = "none";
document.getElementsByClassName("card")[12].style.display = "none";
document.getElementsByClassName("card")[13].style.display = "none";

//get hotel by id and fill hotel Page info

function openHotelPage(id) {

    let hotel = hotels.find(i => i.id === id);
    document.getElementById("homeAndSearch_container").style.display = "none";
    document.getElementById("hotelInfo_container").style.display = "flex";
    document.getElementById("type_1").selectedIndex = "0";
    document.getElementById("type_2").selectedIndex = "0";


    if (Object.keys(loggedInUser).length === 0 && loggedInUser.constructor === Object) {
        document.getElementById("reserve_btn").disabled = true;

    }
    else {
        document.getElementById("reserve_btn").disabled = false;
    }

    let img_1 = document.getElementById("img_1");
    let img_2 = document.getElementById("img_2");
    let img_3 = document.getElementById("img_3");
    let img_4 = document.getElementById("img_4");
    let img_5 = document.getElementById("img_5");
    let img_6 = document.getElementById("img_6");

    img_1.src = hotel.bannerImg;
    img_2.src = hotel.img_galery[0];
    img_3.src = hotel.img_galery[1];
    img_4.src = hotel.img_galery[2];
    img_5.src = hotel.img_galery[3];
    img_6.src = hotel.img_galery[4];
    let hotel_page_title = document.getElementById("hotel_page_title");

    hotel_page_title.textContent = hotel.name;
    let table_address_data = document.getElementById("address_data");
    table_address_data.textContent = hotel.address;
    let table_rooms_data = document.getElementById("numOfrooms_data");
    table_rooms_data.textContent = hotel.numberOfRooms;
    let table_maxGuests_data = document.getElementById("maxGuests_data");
    table_maxGuests_data.textContent = hotel.maxNumberOfGuest;
    let table_facilityItem_data = document.getElementById("facilityItem_data");
    table_facilityItem_data.textContent = [`Parking: ${hotel.parking}, swimming pool:${hotel.swimmingPool},  spa: ${hotel.spa}, 
    fitness: ${hotel.fitness}, internet: ${hotel.internet}`];
    let table_childPolicy_data = document.getElementById("childPolicy_data");
    table_childPolicy_data.textContent = hotel.childPolicies;
    let roomType_data1 = document.getElementById("room_type1");
    roomType_data1.textContent = hotel.roomType[0];
    let roomType_data2 = document.getElementById("room_type2");
    roomType_data2.textContent = hotel.roomType[1];
    let price_1 = document.getElementsByClassName("price-1night")[0];
    price_1.textContent = hotel.price[0];
    let price_2 = document.getElementsByClassName("price-1night")[1];
    price_2.textContent = hotel.price[1];
    let rating_stars = document.getElementsByClassName("rating-stars");
    for (i = 0; i < hotel.numberOfStars; i++) {

        rating_stars[i].style.display = "inline";
    }



}
//reservation//

class Reservation_info {
    constructor(userId, hotelName, hotelAddress, selectedRooms, checkInDate, checkOutDate) {
        this.userId = userId;
        this.hotelName = hotelName;
        this.hotelAddress = hotelAddress;
        this.selectedRooms = selectedRooms;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
    }
}
class SelectedRoomDetails {
    constructor(type, number, price) {
        this.type = type;
        this.number = number;
        this.price = price;
    }
}

function reservation() {

    let price_1 = document.getElementsByClassName("price-1night")[0].textContent;
    let price_2 = document.getElementsByClassName("price-1night")[1].textContent;
    let roomType_data1 = document.getElementById("room_type1").textContent;
    let roomType_data2 = document.getElementById("room_type2").textContent;
    let table_address_data = document.getElementById("address_data").textContent;
    let hotel_page_title = document.getElementById("hotel_page_title").textContent;

    let selected_room1 = document.getElementById("type_1");
    let selected_room1_value = selected_room1.options[selected_room1.selectedIndex].value;
    let selected_room2 = document.getElementById("type_2");
    let selected_room2_value = selected_room2.options[selected_room2.selectedIndex].value;
    let room1_sum = price_1 * selected_room1_value;
    let room2_sum = price_2 * selected_room2_value;
    let checkInDate = document.getElementById("checkIn").value;
    let checkOutDate = document.getElementById("checkOut").value;

    let rooms = [];
    if (selected_room1_value != 0) {
        let room = new SelectedRoomDetails(roomType_data1, selected_room1_value, room1_sum);
        rooms.push(room);
    }
    if (selected_room2_value != 0) {
        let room = new SelectedRoomDetails(roomType_data2, selected_room2_value, room2_sum);
        rooms.push(room);
    }

    let reservationInfo = new Reservation_info(loggedInUser.id, hotel_page_title, table_address_data, rooms, checkInDate, checkOutDate);

    if ((checkInDate == "" || checkOutDate == "") && (selected_room1_value == 0 && selected_room2_value == 0)) {
        alert("please select room and date")
    }
    
    else if (selected_room1_value == 0 && selected_room2_value == 0) {
        alert("please select rooms")
    }
    else if (checkInDate == "" || checkOutDate == "") {
        alert("please select check in/out date")
    }
    else {
        let bookingHistory = localStorage.getItem("reservations");
        let bookingParsedArray = JSON.parse(bookingHistory);
        if (!bookingParsedArray) {
            bookingParsedArray = [];
        }
        bookingParsedArray.push(reservationInfo);
        let bookingHistoryStringArray = JSON.stringify(bookingParsedArray);
        localStorage.setItem("reservations", bookingHistoryStringArray);

        alert("Hotel Booked Successfully!");
        selected_room1.selectedIndex = "0";
        selected_room2.selectedIndex = "0";


    }
}


// slider
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


/*================= POPULAR REGIONS ===================*/
class Region {
    constructor(name, regionImg) {
        this.name = name;
        this.regionImg = regionImg;
    }
}
let guria = new Region("Guria", "./img/regions/guria/1.jpg");
let kakheti = new Region("Kakheti", "./img/regions/kakheti/1.jpg");
let samegreloZemoSvaneti = new Region("Samegrelo-Zemo-Svaneti", "./img/regions/samegrelo-zemoSvaneti/1.jpg");
let tbilisi = new Region("Tbilisi", "./img/regions/tbilisi/1.jpg");

let popularRegions = [guria, kakheti, samegreloZemoSvaneti, tbilisi];
popularRegions.forEach(region => {
    let region_card_wrapper = document.getElementById("region_card_wrapper");

    let regionCard = document.createElement("div");
    regionCard.className = "cardForRegion";
    let regImage = document.createElement("img");
    regImage.src = region.regionImg;
    let regionTitle = document.createElement("h3");
    regionTitle.textContent = region.name;


    region_card_wrapper.appendChild(regionCard);
    regionCard.appendChild(regImage);
    regionCard.appendChild(regionTitle);
})

//Search / filter//
function openSearchPage() {
    document.getElementById("searchBy_name").value = "";
    document.getElementById("searchBy_city").value = "";
    document.getElementById("searchBy_address").value = "";
    document.getElementById("searchBy_roomsMinNum").value = "";

    document.getElementById("selectBy_stars").selectedIndex = "0";
    document.getElementById("selectBy_facilityItems").selectedIndex = "0";
    document.getElementById("homeAndSearch_container").style.display = "block";
    document.getElementById("hotelInfo_container").style.display = "none";
    document.getElementById("userInfo_container").style.display = "none";
    document.getElementById("homepage_news").style.display = "none";
    document.getElementById("regions").style.display = "none";
    document.getElementById("dynamicTitle").style.display = "none";
    document.getElementById("regLoginForm_container").style.display = "none";

    let searchedHotels = [...hotels];
    let allHotelCard = document.getElementById("hotel_card_wrapper");
    allHotelCard.remove();
    let hotelCards = document.getElementById("hotel_cards");
    let cardWrapper = document.createElement("div");
    cardWrapper.id = "hotel_card_wrapper";
    cardWrapper.className = "card-wrapper";
    hotelCards.appendChild(cardWrapper);
    searchedHotels.forEach(hotel => {
        let hotel_card_wrapper = document.getElementById("hotel_card_wrapper");

        let card = document.createElement("div");
        card.className = "card";
        let cardTitle = document.createElement("h4");
        let cardBannerHref = document.createElement("a");
        let bannerImg = document.createElement("img");
        bannerImg.onclick = function () { openHotelPage(hotel.id) };
        let cardList = document.createElement("ul");
        let addressListItem = document.createElement("li");


        cardTitle.textContent = hotel.name;
        bannerImg.src = hotel.bannerImg;
        addressListItem.textContent = [`location: ${hotel.address}`];

        hotel_card_wrapper.appendChild(card);
        card.appendChild(cardBannerHref);
        cardBannerHref.appendChild(bannerImg);
        card.appendChild(cardTitle);
        card.appendChild(cardList);
        cardList.appendChild(addressListItem);

    });

    document.getElementsByClassName("card")[2].style.display = "block"
    document.getElementsByClassName("card")[4].style.display = "block"
    document.getElementsByClassName("card")[6].style.display = "block"
    document.getElementsByClassName("card")[8].style.display = "block"
    document.getElementsByClassName("card")[12].style.display = "block"
    document.getElementsByClassName("card")[13].style.display = "block"
    let allHotels = document.getElementById("searchBar_container");
    allHotels.style.display = "flex";

}
function searchHotel() {

    let cardsTohide = document.getElementsByClassName("card");
    for (var i = 0; i < cardsTohide.length; i++) {
        cardsTohide[i].style.display = "none";
    }
    let searchedHotels = [...hotels];


    let name = document.getElementById("searchBy_name").value;

    let city = document.getElementById("searchBy_city").value;

    let address = document.getElementById("searchBy_address").value;
    let roomsMinNum = parseInt(document.getElementById("searchBy_roomsMinNum").value);

    let selected_stars = document.getElementById("selectBy_stars");
    let stars = parseInt(selected_stars.options[selected_stars.selectedIndex].value);
    let selected_facilityItem = document.getElementById("selectBy_facilityItems");
    let facilityItem = selected_facilityItem.options[selected_facilityItem.selectedIndex].value;
    if (name == "" && city == "" && address == "" && (isNaN(roomsMinNum) || roomsMinNum <= 0) && stars == 0 && facilityItem == "") {
        searchedHotels = [...hotels];


    }
    else {
        if (name !== "") {
            searchedHotels = searchedHotels.filter(i => i.name.toLowerCase().includes(name.toLowerCase()));

        }


        if (city !== "") {

            searchedHotels = searchedHotels.filter(i => i.city.toLowerCase().includes(city.toLowerCase()));

        }

        if (address !== "") {

            searchedHotels = searchedHotels.filter(i => i.address.toLowerCase().includes(address.toLowerCase()));

        }


        if (roomsMinNum != NaN && roomsMinNum > 0) {

            searchedHotels = searchedHotels.filter(i => i.numberOfRooms >= roomsMinNum);

        }
        if (stars > 0) {

            searchedHotels = searchedHotels.filter(i => i.numberOfStars == stars);

        }
        if (facilityItem != "") {

            searchedHotels = searchedHotels.filter(i => i[facilityItem].toLowerCase() == "Yes".toLowerCase());

        }

    }

    let allHotelCard = document.getElementById("hotel_card_wrapper");
    allHotelCard.remove();
    let hotelCards = document.getElementById("hotel_cards");
    let cardWrapper = document.createElement("div");
    cardWrapper.id = "hotel_card_wrapper";
    cardWrapper.className = "card-wrapper";
    hotelCards.appendChild(cardWrapper);
    searchedHotels.forEach(hotel => {
        let hotel_card_wrapper = document.getElementById("hotel_card_wrapper");

        let card = document.createElement("div");
        card.className = "card";
        let cardTitle = document.createElement("h4");
        let cardBannerHref = document.createElement("a");
        let bannerImg = document.createElement("img");
        bannerImg.onclick = function () { openHotelPage(hotel.id) };
        let cardList = document.createElement("ul");
        let addressListItem = document.createElement("li");


        cardTitle.textContent = hotel.name;
        bannerImg.src = hotel.bannerImg;
        addressListItem.textContent = [`location: ${hotel.address}`];

        hotel_card_wrapper.appendChild(card);
        card.appendChild(cardBannerHref);
        cardBannerHref.appendChild(bannerImg);
        card.appendChild(cardTitle);
        card.appendChild(cardList);
        cardList.appendChild(addressListItem);

    });

};
