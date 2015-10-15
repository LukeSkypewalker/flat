Queries = new Mongo.Collection("queries");
src="";
dst="";
//mtchs=[];

if (Meteor.isClient) {

  Template.q.events({
    'submit form': function (e) {
      e.preventDefault();
  
      src=$(e.target).find('[name=source]').val();
      dst=$(e.target).find('[name=dest]').val();
      // Insert a query into the collection
      Queries.insert({
        source: src,
        dest: dst
      });
 
      Session.set('mtchs', Queries.find({
         source: $(e.target).find('[name=dest]').val(), 
         dest: $(e.target).find('[name=source]').val() 
      }).fetch() );

      console.log(Session.get('mtchs'))
      //Clear form
      //$(e.target).find('[name=source]').val("");
      //$(e.target).find('[name=dest]').val("");
    }
  });

  Template.query.events({
    "click .delete": function () {
      Queries.remove(this._id);
    }
  });

  Template.body.helpers({
    matches: function () {
      //TODO VARIABLES - Queries.find({source: XXX, dest: YYY });
      //TODO HIDE and show after submit
      //console.log(src);
      return Session.get('mtchs');
    },

    allDataBase: function () {
      return Queries.find({});
    }
  });

  Template.body.events({
    "submit.new-query": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
    }
  });


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}