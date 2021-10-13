function initMap() {
    // The location of user
    const userLocation = {lat: 1.3521, lng: 103.8198};
    
    // The map, centered at user
    const map = new google.maps.Map(document.getElementById("map"), 
                {zoom:11, center: userLocation,});

    // The marker, positioned at user
    const marker = new google.maps.Marker({position: userLocation, map: map,});
}