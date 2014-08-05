SOC.Views.ShowAnswer = Backbone.CompositeView.extend({
  template: JST['answers/show'],
  
  initialize: function (options) {
    var that = this;
    this.superView = options.superView;
    this.question = this.superView.model;
    this.comments = this.model.comments();   
    this.editingAnswer = false;
    this.errors = [];
    this.currentUserVotes = SOC.currentUser.votes();
    this.listenTo(this.model, 'revertToCommentFormLink', this.renderCommentFormLink);    

    this.listenTo(this.model, 'sync', this.render);
  },  

  events: {
    'click .newAnswerCommentLink': 'newComment',
    'click .destroy': 'deleteAnswer',
    'click .edit': 'editAnswerForm',
    'click .submitAnswer': 'submit'   
  },
  
  render: function () {
    var that = this;
    var content = this.template({
      answer: this.model,
      question: this.question,
      collection: this.superView.answers,
      superView: this.superView,
      editingAnswer: this.editingAnswer,
      errors: this.errors
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
      author_id: that.model.escape("author_id"),
      score: that.model.escape("score"),
    });
    this.addSubview("#answer-votecell", showVoteView)
  },
  
  
  deleteAnswer: function(){
    event.preventDefault();    
    this.model.destroy();
    this.remove();
  },

  editAnswerForm: function(){
    this.editingAnswer = true;
    this.render();
  },
  
  submit: function(event){
    var that = this;
    event.preventDefault();
    
    var params = { 
      answer: {
        body: this.$('.answerText').val(),
        question_id: this.question.id
      }
    };
    this.model.set(params);
    that.model.save(null, {
      success: function(model, response){
        if(that.editingAnswer){          
          that.editingAnswer = false;
          that.collection.add(that.model)
          that.render();
        }
        that.errors = []
      },
      error: function (model, response, opts) {
        that.errors = response.responseJSON;
        that.render();
      }
    })
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
    if(SOC.currentUserId){
      this.$(".newAnswerComment").html("<div class ='row'><a class='newAnswerCommentLink col-xs-12'>Add comment</a> <div style='padding-top: 10px; padding-bottom: 40px;' class='bordered'></div></div>");
    } else{
      this.$(".newAnswerComment").html("<div class='row'><a href='/session/new/' class='col-xs-12'>Sign in to leave comment</a><div style='padding-top: 10px; padding-bottom: 40px;' class=''></div></div>");
    }
  },
    
  removeCommentFormLink: function () {
    this.$(".newAnswerComment").empty();
  }
  
  
});
