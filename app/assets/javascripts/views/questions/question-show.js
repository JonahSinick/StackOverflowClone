SOC.Views.ShowQuestion = Backbone.CompositeView.extend({
  template: JST['questions/show'],

  initialize: function (options) {
    
    this.answers = this.model.answers();   
    this.comments = this.model.comments();   
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.answers, 'create', this.addAnswer);

  },

  render: function () {
    var content = this.template({
      question: this.model
    });
    this.$el.html(content);
    this.renderAnswers();
    this.renderNewAnswerForm();
    this.renderComments();

    this.renderNewCommentForm();
    
    return this;
  },
  
  renderAnswers: function () {
    this.answers.each(this.addAnswer.bind(this));
    
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
    var answer  = new SOC.Models.Answer()
    var view = new SOC.Views.NewAnswer({
      question: this.model,      
      collection: this.answers,
      model: answer,
      superView: this
    });
    this.addSubview("#answer-form", view);
  },
  
  
  renderComments: function () {
    this.comments.each(this.addAnswer.bind(this));
    
  },
  
  addComment: function (comment) {
    var view = new SOC.Views.ShowComment({
      model: comment
    });
    this.addSubview("#question-comments", view);
  },

  
  renderNewCommentForm: function () {
    var comment  = new SOC.Models.Comment()
    var view = new SOC.Views.NewComment({
      collection: this.comments,
      model: comment,
      superView: this,
      commentable_type: "question",
      commentable_id: this.model.id
    });
    this.addSubview("#question-commment-form", view);
  }
  

});