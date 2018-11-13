var im = 'http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png';

function locate() {
    navigator.geolocation.getCurrentPosition(initialize, fail);
}

var label = [
    ['Dibyajit Bardhan'],
    ['Deepak Senapati'],
    ['Naina Singh'],
    ['person 4'],
    ['person 5'],
    ['person 6'],
    ['person 7']
]

var last_seen = [
    ['2 hours ago'],
    ['current location'],
    ['31 minutes ago']
]

function initialize(position) {
    var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
        zoom: 16,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }
    var map = new google.maps.Map(document.getElementById('map_canvas'),
        mapOptions);
    var userMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: im
    });

    var southWest = new google.maps.LatLng(position.coords.latitude + 0.00005, position.coords.longitude + 0.00005);
    var northEast = new google.maps.LatLng(position.coords.latitude - 0.00005, position.coords.longitude - 0.00005);
    var lngSpan = northEast.lng() - southWest.lng();
    var latSpan = northEast.lat() - southWest.lat();

    var count;

    for (var i = 0; i < 3; i++) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(southWest.lat() + latSpan * Math.random(), southWest.lng() + lngSpan * Math.random()),
            map: map
        });

        var contentString = '<h5>' +
            label[i][0] +
            '</h5>' +
            '<p style="color: #6f6f70;">' +
            last_seen[i][0] +
            '</p>';

        marker.info = new google.maps.InfoWindow({
            content: contentString
        });


        google.maps.event.addListener(marker, 'click', function() {
            // this = marker
            var marker_map = this.getMap();
            this.info.open(marker_map, this);
            // Note: If you call open() without passing a marker, the InfoWindow will use the position specified upon construction through the InfoWindowOptions object literal.
        });
    }
}

function fail() {
    alert('navigator.geolocation failed, may not be supported');
}