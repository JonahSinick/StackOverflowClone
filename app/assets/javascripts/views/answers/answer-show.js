SOC.Views.ShowAnswer = Backbone.CompositeView.extend({
  template: function(){
    return this.editButtonClicked ? JST['answers/new'] : JST['answers/show'];
  },
  
  initialize: function (options) {
    var that = this
    this.newCommentLink = new SOC.Views.NewAnswerCommentLink();    
    this.superView = options.superView;
    this.question = this.superView.model;
    this.comments = this.model.comments();   

    this.currentUserVotes = SOC.currentUser.votes();
    this.listenTo(this.model, 'revertToCommentFormLink', this.renderCommentFormLink);    

    this.listenTo(this.model, 'sync', this.render);
  },  

  events: {
    'click .newAnswerCommentLink': 'newComment',
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
      that.renderCommentFormLink();
      that.renderVoteCell();
      
    }
    return this;
  },
  

  renderVoteCell: function(){
    var that = this;    
    this.currentUserVote = this.currentUserVotes.select(function (vote) {
        return vote.get("votable_id") === that.model.id;
    })[0]; 
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
    this.remove();
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
    this.addSubview(".answerCommentNewShowEdit", view);
  },
  
  
  
  newComment: function(){
    event.preventDefault();    
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
    this.addSubview(".answerCommentNewShowEdit", view);
  },



  
  renderCommentFormLink: function(){
    this.$(".newAnswerComment").html("<a class='newAnswerCommentLink'>Add comment</a>");
    
    // this.$(".comment-form-link").html("<a id='new-question-comment-link'>Add comment</a>")
    

  },
  
  removeCommentFormLink: function () {
    this.$(".newAnswerComment").empty();
  }
  
  
});


SOC.Views.NewAnswerCommentLink = Backbone.CompositeView.extend({
  template: $("<a class='newAnswerCommentLink'>Add comment</a>"),
  
  render: function(){
    var content = this.template
    this.$el.html(content);
    return this
  }
})