function initMap() {
    // The location of user
    const userLocation = { lat: 1.3521, lng: 103.8198 };

    // The map, centered at user
    const map = new google.maps.Map(document.getElementById("map"),
        { zoom: 11, center: userLocation, });

    // The marker, positioned at user
    const marker = new google.maps.Marker({ position: userLocation, map: map, });
}


$(document).ready(function () {
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
});

$(document).ready(function () {
    $('#gameList').owlCarousel({
        items: 3,
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
                items:3,
                nav:true,
                loop:false
            }
        }
    });
});
