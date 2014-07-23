SOC.Collections.Answers = Backbone.Collection.extend({
  urlRoot: "api/answers",
  model: SOC.Models.Answer,
  
  initialize: function (models, options) {
    this.question = options.question;
  }
  
})