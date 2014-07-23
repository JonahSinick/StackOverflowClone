SOC.Views.QuestionsIndex = Backbone.CompositeView.extend({
  template: JST['questions/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      questions: this.collection
    });
    this.$el.html(content);
    this.renderQuestions()
    return this;
  },
  
  renderQuestions: function () {
    this.collection.each(this.addQuestion.bind(this));
  },
  
  addQuestion: function (question) {
    var view = new SOC.Views.QuestionRow({
      model: question
    });
    this.addSubview("#questions", view);
  }
});
