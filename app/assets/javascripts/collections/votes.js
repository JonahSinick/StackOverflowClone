SOC.Collections.Votes = Backbone.Collection.extend({
  url: "/api/votes",
  model: SOC.Models.Vote
})