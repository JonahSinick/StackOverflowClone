SOC.Collections.Users = Backbone.Collection.extend({
  url: "api/users",
  model: SOC.Models.User
})