window.SOC = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    SOC.questions = new SOC.Collections.Questions();
    SOC.users = new SOC.Collections.Users();
    SOC.signedIn = $("#signed_in").data("signed-in")
    SOC.requireSignedIn = function(){
      if(SOC.signedIn === false){
        alert("You must be signed in to do that!");
        return false;
      }
    };

    new SOC.Routers.Router({
      $rootEl: $("#main")
    });
    Backbone.history.start();
  }
};

