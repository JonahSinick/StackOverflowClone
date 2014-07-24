SOC.Views.ShowQuestion = Backbone.CompositeView.extend({
  template: JST['questions/show'],

  initialize: function (options) {
    
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

    this.renderNewAnswerForm();
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
    var $newhead = $("<h2>" + this.model.answers().length + ' Answers' + "</h2>")
    this.$('.answers-subheader').html($newhead)

  },

  
  renderNewAnswerForm: function () {
    var view = new SOC.Views.NewAnswer({
      model: this.model,      
      collection: this.collection
    });
    this.addSubview("#answer-form", view);
  }

});
