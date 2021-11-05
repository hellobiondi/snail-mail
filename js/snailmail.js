function initMap(userLat,userLng) {
    // The location of user
    const userLocation = {lat: userLat, lng: userLng}
    // The map, centered at user
    const map = new google.maps.Map(document.getElementById("map"),
        { mapTypeId: "terrain", zoom: 15, center: userLocation });

    // The marker, positioned at user
    //const marker = new google.maps.Marker({ position: userLocation, map: map, });
    const circle = new google.maps.Circle({
        map: map,
        radius: 400,
        fillColor: "#6EB6CF",
        strokeColor: "#5898ad",
        strokeWeight: 3,
        map,
        center: userLocation
    });
}

function getFullAddress(data) {
    var addr = data["results"][0]["formatted_address"];
    var loc = getLatLng(data);
    return {addr, loc};
}

function getLatLng(data) {
    var location = data["results"][0]["geometry"]["location"];
    return location;
}

function getUserAddress(address){
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+ address +"&key=AIzaSyC8lhtpvwx2mVd3s9LZn4SHdmWupn0zhXc";
    axios.get(url)
        .then(response => {   
            //console.log(response.data);
            var info = getFullAddress(response.data);
            initMap(info.loc.lat,info.loc.lng);
        })
        .catch(error => {
            console.log(error);
        });
}

const notification = document.getElementById("notification-container");
//console.log(notification);

function showNotification(){
    notification.classList.remove("d-none");
    setTimeout(() =>{
        notification.classList.add('d-none');
    },3000);
    //console.log("Notification works");
}


//Profile.html: Enable user to update their about information
document.getElementById("editAbout").addEventListener("click", function () {
    document.getElementById("userName").removeAttribute("disabled");
    document.getElementById("userBio").removeAttribute("disabled");
    document.getElementById("editAbout").style.display = "none";
    document.getElementById("cancelAbout").style.display = "inline";
    document.getElementById("saveAbout").style.display = "inline";
});

/*$(document).ready(function () {
    $('#friendsList').owlCarousel({
        items: 4,
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        navigation: false, // Show next and prev buttons
        stopOnHover: true,
        pagination: false,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        loop:true,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:3,
                nav:false
            },
            1000:{
                items:5,
                nav:true,
                loop:false
            }
        }
    });
});*/



function loadFriends() {
    $('#friendsList').owlCarousel({
        items: 4,
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        navigation: false, // Show next and prev buttons
        stopOnHover: true,
        pagination: false,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        loop:true,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:3,
                nav:false
            },
            1000:{
                items:5,
                nav:true,
                loop:false
            }
        }
    });
}

$(document).ready(function () {
    $('#gameList').owlCarousel({
        items: 3,
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        navigation: false, // Show next and prev buttons
        stopOnHover: true,
        pagination: false,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        loop:false,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:3,
                nav:false
            },
            1000:{
                items:3,
                nav:true,
                loop:false
            }
        }
    });
});