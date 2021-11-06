export function codeAddress(address) {
    //var address = document.getElementById('address').value;
    var geocoder = new google.maps.Geocoder();
    return new Promise(resolve => {geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        var point = results[0].geometry.location;
        resolve(point);
      } else {
        
        console.log('Error: ' + status);
        resolve(false);
      }
    });});
  }

  export async function calculateDist(addr1,addr2){
    var p1 = await codeAddress(addr1);
    var p2 = await codeAddress(addr2);
    //var m1_lat = m1.lat();
    //var m1_lng = m1.lng();    
    //var m2_lat = m2.lat();
    //var m2_lng = m2.lng();
    //new google.maps.Polyline({path: [{lat:m1_lat,lng:m1_lng}, {lat:m2_lat,lng:m2_lng}], map: map});
    var d = haversine_distance(p1,p2);
    var d_km = d * 1.60934;
    
    console.log("distance: "+d_km.toFixed(2) + " km");
    var delay = estimateTime(d_km.toFixed(2));

    console.log(delay);
    return delay;
  }

  export function estimateTime(dist){
    //each 300km = 1 day
    var delay;
    //var estimated_time = Math.min(Math.floor(dist/500),8);
    if(dist<500){
        delay = 0;
    }else if(dist<1000){
        delay = 1;
    }else if(dist<1500){
        delay = 2;
    }else if(dist<2000){
        delay = 3;
    }else if(dist<2500){
        delay = 4;
    }else if(dist<3000){
        delay = 5;
    }else if(dist<3500){
        delay = 6;
    }else if(dist<4000){
        delay = 7;
    }else{
        delay = 8;
    }

    return delay;
  }

  export function haversine_distance(p1, p2) {
      var R = 3958.8; // Radius of the Earth in miles
      var rlat1 = p1.lat() * (Math.PI/180); // Convert degrees to radians
      var rlat2 = p2.lat() * (Math.PI/180); // Convert degrees to radians
      var difflat = rlat2-rlat1; // Radian difference (latitudes)
      var difflon = (p2.lng()-p1.lng()) * (Math.PI/180); // Radian difference (longitudes)

      var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
      return d;
    }