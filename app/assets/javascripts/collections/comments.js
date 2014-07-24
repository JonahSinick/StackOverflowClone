SOC.Collections.Comments = Backbone.Collection.extend({
  url: "api/comments",
  model: SOC.Models.Comment
})