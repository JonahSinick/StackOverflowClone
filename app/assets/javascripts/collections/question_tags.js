SOC.Collections.QuestionTags = Backbone.Collection.extend({
  url: "/api/question_tags",
  model: SOC.Models.QuestionTag
})