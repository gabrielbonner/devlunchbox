// constructor function to save new markers
var Marker = function(params){this.name = params['name'];
                                      this.description = params['description'];
                                      this.tags = params['tags'];
                                      this.latitude = params['latitude'];
                                      this.longitude = params['longitude'];}
function initMap() {
  var styles = [{"featureType":"poi.school","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.bus","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","stylers":[{ "visibility":"off"}]},{"featureType":"transit.station.rail","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#00e5ff"},{"color":"#19ABB5"},{"weight":1.0}]},{"featureType":"poi.sports_complex","elementType":"labels.text","stylers":[{"visibility":"off"}]}]
  var mapDiv = document.getElementById('map');

  // create map on page
  var map = new google.maps.Map(mapDiv, {
    center: {lat: 32.7154026, lng: -117.158000},
    zoom: 18,
    // HYBRID has satellite view with street names, can also be ROADMAP, etc...
    mapTypeId:google.maps.MapTypeId.HYBRID
  });

  // 'school' icon placed on DBC
  var marker = new google.maps.Marker({
    position: {lat: 32.7155500, lng: -117.158000},
    map: map,
    icon: 'https://i.imgur.com/ltTnna4.png',
    // dbc logo colors are cyan = #19ABB5 , grey = #828C91
    title: 'DBC'
  });

  map.setOptions({styles: styles});

  // displaying form to capture marker info from user
  google.maps.event.addListener(map, 'rightclick', function( event ){
    new google.maps.Marker({position: {lat: event.latLng.lat(), lng: event.latLng.lng()}, map: map});
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();
    $('#instructions').hide();
    $('#add-new-lunchbox-div').show();

    // create new marker and send to server to persist data
    $('#add-new-lunchbox-div').on('click', '#add-lunchbox-btn', function(event){
      event.preventDefault();
      var name = $(this).closest('form').find('input[name=name]').val();
      var description = $(this).closest('form').find('input[name=description]').val();
      var tags = $(this).closest('form').find('input[name=tags]').val().split(', ');
      // var infowindow = new google.maps.InfoWindow({"<h3>"+name+"</h3>" +
      //                                              "<p>Description: "+description+"</p>" +
      //                                              "<p>Tags: "+tags+"</p>"
      //                                             });
      lunchbox_marker = new Marker({name: name,
                                          description: description,
                                          tags: tags,
                                          latitude: latitude,
                                          longitude: longitude})
      console.log(lunchbox_marker)  // it's aliiiiiive!

      $.ajax({
        method: 'post',
        dataType: 'json',
        url: '/',
        data: lunchbox_marker
      })
        .done(function(response){
          alert("Your marker was saved to the map");
        })
        .fail(function(response){
          console.log('Server\'s response was ===> ' + response)
        });

      // TODO:
      // reload page
      // on page reload, all of the markers in the database are loaded in the map

      // pressing cancel button reloads the page
      $('#add-new-lunchbox-div').on('click', '#cancel-add-lunchbox-btn', function(event){
        event.preventDefault();
        location.reload(true)
      });
    });
  });
}
