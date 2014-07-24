window.SOC = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    SOC.questions = new SOC.Collections.Questions();
    SOC.users = new SOC.Collections.Users();
    SOC.currentUserId = $("#current_user_id").data("current-user-id");
    new SOC.Routers.Router({
      $rootEl: $("#main")
    });
    Backbone.history.start();
  }
};

