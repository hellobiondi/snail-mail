function initMap() {
    // The location of user
    const userLocation = { lat: 1.3521, lng: 103.8198 };

    // The map, centered at user
    const map = new google.maps.Map(document.getElementById("map"),
        { zoom: 11, center: userLocation, });

    // The marker, positioned at user
    const marker = new google.maps.Marker({ position: userLocation, map: map, });
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
    const userNameInput = document.getElementById("userName").value;
    const userBioInput = document.getElementById("userBio").value;
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