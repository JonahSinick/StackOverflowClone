SOC.Collections.Answers = Backbone.Collection.extend({
  url: "api/answers",
  model: SOC.Models.Answer,
  
  initialize: function (models, options) {
    this.question = options.question;
  },
  
  comparator: function(answer) {
    return - answer.get("score");
  },
  
  
})