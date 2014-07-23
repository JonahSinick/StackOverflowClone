SOC.Views.ShowQuestion = Backbone.CompositeView.extend({
  template: JST['questions/show'],

  initialize: function () {
    debugger
    this.answers = this.model.answers();    
    this.listenTo(this.model, 'sync', this.render);    
    this.listenTo(this.answers, 'add', this.render);
  },

  render: function () {
    var content = this.template({
      question: this.model
    });
    this.$el.html(content);

    this.renderAnswers();
    return this;
  },
  
  renderAnswers: function () {
    this.answers.each(this.addAnswer.bind(this));
  },
  
  addAnswer: function (answer) {
    var view = new SOC.Views.ShowAnswer({
      model: question
    });
    this.addSubview(".answers", view);
  }
});
