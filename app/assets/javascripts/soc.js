window.SOC = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    SOC.users = new SOC.Collections.Users();
    new SOC.Routers.Router({
      $rootEl: $("#main")
    });
  }
};

$(document).ready(function(){
  SOC.initialize();
});
