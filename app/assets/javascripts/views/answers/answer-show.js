SOC.Views.ShowAnswer = Backbone.CompositeView.extend({
  template: function(){
    return this.editButtonClicked ? JST['answers/new'] : JST['answers/show'];
  },
  
  initialize: function (options) {
    var that = this
    this.superView = options.superView;
    this.question = this.superView.model;
    this.comments = this.model.comments();   
    this.creatingComment = false;

    this.currentUserVotes = SOC.currentUser.votes();
    this.listenTo(this.comments, 'add', this.addComment);
    this.listenTo(this.comments, 'add', this.renderCommentFormLink);
    

    this.listenTo(this.model, 'sync', this.render);
  },  

  events: {
    'click #new-question-comment-link': 'newComment',
    'click .answer-destroy': 'deleteAnswer',
    'click .answer-edit': 'editAnswerForm',
    'click .question-answer': 'submit'   
  },
  
  render: function () {
    var that = this;
    var content = this.template()({
      answer: this.model,
      question: this.question,
      collection: this.superView.answers,
      superView: this.superView,
      errors: []
    });
    this.$el.html(content);
    if(this.model.escape("body")){
      that.renderComments();
      if(that.commentFormLinkedClicked === false){
        that.renderCommentFormLink();
      };
      that.renderVoteCell();
      
    }
    return this;
  },
  

  renderVoteCell: function(){
    var that = this;
    var showVoteView = new SOC.Views.ShowVote({
      votable_type: "Answer", 
      votable_id: that.model.id, 
      currentUserVote: that.currentUserVote, 
      score: that.model.escape("score") 
    });
    this.addSubview("#answer-votecell", showVoteView)
  },
  
  
  deleteAnswer: function(){
    event.preventDefault();
    this.model.destroy();
  },

  editAnswerForm: function(){
    this.editButtonClicked = true;
    this.render();
  },
  
  submit: function(){
    this.editButtonClicked = false;
    
    event.preventDefault();
    
    var params = { 
      answer: {
        body: $('textarea').val(),
        question_id: this.question.id
      }
    };
    this.model.set(params);
    this.model.save();
    this.render();
  },


  renderComments: function () {
    this.comments.each(this.addComment.bind(this));
  },
  
  addComment: function (comment) {
    var view = new SOC.Views.CommentNewShowEdit({
      model: comment,
      superView: this,
      creating: false,
      action: "show"
    });
    this.addSubview(".comment-new-show-edit", view);
  },
  
  
  
  newComment: function(){
    this.removeCommentFormLink();
    var that = this;
    var view = new SOC.Views.CommentNewShowEdit({
      creating: true,
      collection: that.comments,
      model: new SOC.Models.Comment({      
        commentable_type: "Answer",
        commentable_id: that.model.id,
      }),
      superView: that,
      action: "new"
    });
    this.addSubview(".comment-new-show-edit", view);
  },



  
  renderCommentFormLink: function(){
    var view = new SOC.Views.newCommentLink();
    this.addSubview(".comment-form-link", view);
  },
  
  removeCommentFormLink: function () {
    this.$(".comment-form-link").empty();
  }
  
  
});
