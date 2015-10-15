//TODO
//list of stations 
//+ with coordinates
//MAP, coordinates, MongoDB GEO indexes



Queries = new Mongo.Collection("queries");

if (Meteor.isClient) {

  Template.qw.events({
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
    }
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
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}