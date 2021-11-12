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
}

function loadFriends() {
    $('#friendsList').owlCarousel({
        items: 4,
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
                items:2,
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

function showGameList() {
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
                items:2,
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
};


//Animations: Intersection Observers API
const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -300px 0px"
};

const faders = document.querySelectorAll(".animate-fade");
const sliders = document.querySelectorAll(".slide-in");
const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry =>{
        if(!entry.isIntersecting){
            return;
        }else{
            entry.target.classList.add("appear");
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
})

sliders.forEach(slider => {
    appearOnScroll.observe(slider);
});