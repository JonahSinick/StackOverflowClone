SOC.Collections.Tags = Backbone.Collection.extend({
  url: "/api/tags",
  model: SOC.Models.Tag
})