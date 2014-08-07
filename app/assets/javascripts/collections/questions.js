SOC.Collections.Questions = Backbone.Collection.extend({
  url: "api/questions",
  model: SOC.Models.Question,
  
  comparator: function(question) {
    return question.get("created_at");
  },
  
})