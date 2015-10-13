Queries = new Mongo.Collection("queries");
src="";
dst="";

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
 
      // Queries.find({
      //   source: $(e.target).find('[name=dest]').val(), 
      //   dest: $(e.target).find('[name=source]').val() 
      // })


      //Clear form
      $(e.target).find('[name=source]').val("");
      $(e.target).find('[name=dest]').val("");
    }
  });

  Template.body.helpers({
    matches: function () {
      //TODO VARIABLES - Queries.find({source: XXX, dest: YYY });
      //TODO HIDE and show after submit
      //console.log(src);
      return Queries.find({source: dst, dest: src });
    },

    allDataBase: function () {
      return Queries.find({});
    }
    // ,

    // log: function () {
    //   returs src ;
    // }
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

