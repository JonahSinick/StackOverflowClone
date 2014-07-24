window.SOC = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    SOC.questions = new SOC.Collections.Questions();
    SOC.users = new SOC.Collections.Users();


    new SOC.Routers.Router({
      $rootEl: $("#main")
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  SOC.initialize();
});
