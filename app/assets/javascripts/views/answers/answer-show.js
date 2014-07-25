SOC.Views.ShowAnswer = Backbone.CompositeView.extend({
  template: JST['answers/show'],
  
  initialize: function (options) {
    this.superView = options.superView;  
    this.comments = this.model.comments();   
    this.commentFormLinkedClicked = false
    this.listenTo(this.comments, 'create', this.addComment);
    this.listenTo(this.comments, 'sync', this.render);

  },  

  events: {
    'click #new-answer-comment-link': 'renderNewCommentForm'
  },
  

  render: function () {
    var content = this.template({
      answer: this.model
    });
    this.$el.html(content);
    this.renderComments();
    if(this.commentFormLinkedClicked === false){
      this.renderCommentFormLink();
    };
    return this;
  },

  renderComments: function () {
    this.comments.each(this.addComment.bind(this));
  },
  
  addComment: function (comment) {
    var view = new SOC.Views.ShowComment({
      model: comment
    });
    this.addSubview("#answer-comments", view);
  },

  renderCommentFormLink: function () {
    var template = "<a id='new-answer-comment-link'>Add comment</a>";
    var view = new Backbone.CompositeView();
    view.$el.append(template)
    this.addSubview("#answer-commment-form", view);
  },


  
  renderNewCommentForm: function () {
    that = this
    this.commentFormLinkedClicked = true
    this.$("#answer-commment-form").empty()
    var comment  = new SOC.Models.Comment()
    var view = new SOC.Views.NewComment({
      collection: this.comments,
      model: comment,
      superView: this,
      commentable_type: "answer",
      commentable_id: that.model.id,
      question_id: that.model.escape("question_id")
    });
    this.addSubview("#answer-commment-form", view);
  }
  
});
