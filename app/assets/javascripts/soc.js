window.SOC = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    SOC.questions = new SOC.Collections.Questions();
    SOC.questionTitles = new SOC.Collections.Questions();
    SOC.questionTitles.fetch({ data: $.param({all_titles: true})});
    SOC.tags = new SOC.Collections.Tags();
    SOC.tags.fetch();
    SOC.users = new SOC.Collections.Users();
    SOC.currentUserId = $("#current-user-id").data("current-user-id");
    SOC.currentUser = new SOC.Models.User({id: SOC.currentUserId});

    SOC.requireSignedIn = function(){
      if(!SOC.currentUserId){
        alert("You must be signed in to do that! Redirecting to sign in page");
        window.location = "/session/new";
        return false;
      }
    };
    SOC.requireDifferentUser = function(){
      alert("Users can't vote on their own content");
      return false;
    };


    new SOC.Routers.Router({
      $rootEl: $("#main")
    });
    Backbone.history.start();
  }
};

