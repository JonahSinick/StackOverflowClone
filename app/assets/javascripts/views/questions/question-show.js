SOC.Views.ShowQuestion = Backbone.CompositeView.extend({
  template: JST['questions/show'],

  initialize: function () {
    this.collection = this.model.answers();   
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addAnswer);
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
    this.collection.each(this.addAnswer.bind(this));
    
  },
  
  addAnswer: function (answer) {
    var view = new SOC.Views.ShowAnswer({
      model: answer
    });
    this.addSubview("#answers", view);
  }
});
