Queries = new Mongo.Collection("queries");

if (Meteor.isClient) {

  Template.q.events({
    'submit form': function (e) {
      e.preventDefault();
  
      // Insert a query into the collection
      Queries.insert({
        source: $(e.target).find('[name=source]').val(),
        dest: $(e.target).find('[name=dest]').val()
      });
 
      //TODO Clear form
      //$(e.target).find('[name=source]').setValvalue = "z";
    }
  });

  Template.body.helpers({
    matches: function () {
      //TODO VARIABLES - Queries.find({source: XXX, dest: YYY });
      //TODO HIDE and show after submit
      return Queries.find({source: 'Begovaya', dest: 'Fili' });
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

