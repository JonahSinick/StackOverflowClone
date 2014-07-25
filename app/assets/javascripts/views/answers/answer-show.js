SOC.Views.ShowAnswer = Backbone.CompositeView.extend({
  template: JST['answers/show'],
  
  
  

  events: {
    'click #new-question-comment-link': 'renderNewCommentForm'
  },
  

  render: function () {
    var content = this.template({
      answer: this.model
    });
    this.$el.html(content);
    return this;
  }

  renderCommentFormLink: function () {
    var template = "<a id='new-question-comment-link'>Add comment</a>";
    var view = new Backbone.CompositeView();
    view.$el.append(template)
    this.addSubview("#question-commment-form", view);
  },


  
  renderNewCommentForm: function () {
    this.commentFormLinkedClicked = true
    this.$("#question-commment-form").empty()
    var comment  = new SOC.Models.Comment()
    var view = new SOC.Views.NewComment({
      collection: this.comments,
      model: comment,
      superView: this,
      commentable_type: "question",
      commentable_id: this.model.id,
      question_id: this.model.id
    });
    this.addSubview("#question-commment-form", view);
  }
  
});
