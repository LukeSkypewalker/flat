//TODO
//list of stations 
//+ with coordinates
//MAP, coordinates, MongoDB GEO indexes




Queries = new Mongo.Collection("queries");
Subway = new Mongo.Collection("subway");


if (Meteor.isClient) {

  Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.map.helpers({
    // geolocationError: function() {
    //   var error = Geolocation.error();
    //   return error && error.message;
    // },
    mapOptions: function() {
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(55.7500, 37.6214),
          zoom: 12
        };
      }
    }
  });



  Template.map.onCreated(function() {
    GoogleMaps.ready('map', function(map) {
      
      //var geo = Geolocation.latLng();   
      var markerSrc = new google.maps.Marker({
        draggable: true,
        animation: google.maps.Animation.DROP,
        //position: geo,
        position: new google.maps.LatLng(55.75, 37.4972),
        map: map.instance,
        title: 'Source',
        icon: 'up.png'
      });
      var markerDst = new google.maps.Marker({
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(55.75, 37.7255),
        map: map.instance,
        title: 'Destination',
        icon: 'down.png'
      });
      
      google.maps.event.addListener(markerSrc, 'dragend', function(event) {
        Session.set('srcLat', event.latLng.lat());
        Session.set('srcLng', event.latLng.lng());
        //console.log(event.latLng.lat() +" "+ event.latLng.lng());
        console.log(Session.get('srcLat') +" "+ Session.get('srcLng'));
      });

      google.maps.event.addListener(markerDst, 'dragend', function(event) {
        Session.set('dstLat', event.latLng.lat());
        Session.set('dstLng', event.latLng.lng());
        //console.log(event.latLng.lat() +" "+event.latLng.lng());
        console.log(Session.get('dstLat') +" "+ Session.get('dstLng'));
      });

    });
  });      



  Template.body.events({
    'submit form': function (e) {
      e.preventDefault();
  
      src=$(e.target).find('[name=src]').val();
      dst=$(e.target).find('[name=dst]').val();
      srcType=$("input:radio[name=srcType]:checked").val();
      dstType=$("input:radio[name=dstType]:checked").val();
      srcPrice=$(e.target).find('[name=srcPrice]').val();
      dstPrice=$(e.target).find('[name=dstPrice]').val();
      email=$(e.target).find('[name=email]').val();

      Queries.insert({
        src: src,
        dst: dst,
        srcType: srcType,
        dstType: dstType,
        srcPrice: srcPrice,
        dstPrice: dstPrice,
        email: email
      });
 
      Session.set('matches', 
        Queries.find({
         src: dst, 
         dst: src,
        })
      .fetch());

      console.log(Session.get('matches'))
      
      //if you want Clear form
      //$(e.target).find('[name=src]').val("");
      //$(e.target).find('[name=dst]').val("");
    },


  });

  Template.query.events({
    "click .delete": function () {
      Queries.remove(this._id);
    }
  });

  Template.body.helpers({
    matches: function () {
      //TODO HIDE and show after submit
      return Session.get('matches');
    },

    allDataBase: function () {
      return Queries.find({});
    },

    subway: function () {
      return Subway.find({},{sort:{name:1}});
    },

    showMap:function () {
      return Session.get('isShowMap');
    },

    showDataBase:function () {
      return Session.get('isDataBase');
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}