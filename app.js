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
    "Children of any age are welcome.Children aged 6 years and above are considered adults at this property. Accommodation for children under 6 - free",
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
    let cardTitle = document.createElement("a");



    let cardBannerHref = document.createElement("a");
    let bannerImg = document.createElement("img");
    bannerImg.onclick = function () { openHotelPage(hotel.id) };
    let cardList = document.createElement("ul");
    let starsListItem = document.createElement("li");
    let addressListItem = document.createElement("li");


    cardTitle.textContent = hotel.name;
    bannerImg.src = hotel.bannerImg;
    starsListItem.textContent = hotel.numberOfStars;
    addressListItem.textContent = [`location: ${hotel.address}`];

    hotel_card_wrapper.appendChild(card);
    card.appendChild(cardTitle);
    card.appendChild(cardBannerHref);
    cardBannerHref.appendChild(bannerImg);
    card.appendChild(cardList);
    cardList.appendChild(starsListItem);
    cardList.appendChild(addressListItem);

});

//get hotel by id and fill hotel Page info

function openHotelPage(id) {
    let hotel = hotels.find(i => i.id === id);
    document.getElementById("homepage_container").style.display = "none";
    document.getElementById("hotelInfo_container").style.display = "flex";;


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
//reservation

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

    let selected_room1 = document.getElementsByClassName("select_room")[0];//წამოვიღე სელქთი
    let selected_room1_value = selected_room1.options[selected_room1.selectedIndex].value; //ავიღე დასელექტებულის მნშ
    let selected_room2 = document.getElementsByClassName("select_room")[1];
    let selected_room2_value = selected_room2.options[selected_room2.selectedIndex].value;
    let room1_sum = price_1 * selected_room1_value;// დავთვალე თითოეული ტაიპის არჩეული ოთახების ჯამური ფასი
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

    let bookingHistory = localStorage.getItem("reservations");
    let bookingParsedArray = JSON.parse(bookingHistory);
    if (!bookingParsedArray) {
        bookingParsedArray = [];
    }
    bookingParsedArray.push(reservationInfo);
    let bookingHistoryStringArray = JSON.stringify(bookingParsedArray);
    localStorage.setItem("reservations", bookingHistoryStringArray);

    alert("Hotel Booked Successfully!");

}
//Search bar with filter



//hotels full info

// slideshow
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
/*================= Hotels ===================*/

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
    regionCard.className = "card";
    let regImage = document.createElement("img");
    regImage.src = region.regionImg;
    let regionTitle = document.createElement("h3");
    regionTitle.textContent = region.name;


    region_card_wrapper.appendChild(regionCard);
    regionCard.appendChild(regImage);
    regionCard.appendChild(regionTitle);
})
/*================= POPULAR REGIONS ===================*/
/*================= News slideShow ===================*/
var slideshows = document.querySelectorAll('[data-component="slideshow"]');

// Apply to all slideshows that you define with the markup wrote
slideshows.forEach(initSlideShow);

function initSlideShow(slideshow) {

    var slides = document.querySelectorAll(`#${slideshow.id} [role="list"] .slide`); // Get an array of slides

    var index = 0, time = 5000;
    slides[index].classList.add('active');

    setInterval(() => {
        slides[index].classList.remove('active');

        //Go over each slide incrementing the index
        index++;

        // If you go over all slides, restart the index to show the first slide and start again
        if (index === slides.length) index = 0;

        slides[index].classList.add('active');

    }, time);
}