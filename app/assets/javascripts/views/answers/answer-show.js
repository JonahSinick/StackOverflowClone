SOC.Views.ShowAnswer = Backbone.CompositeView.extend({
  template: JST['answers/show'],
  
  initialize: function (options) {
    var that = this
    this.superView = options.superView;
    this.question = this.superView.model;
    this.comments = this.model.comments();   
    this.commentFormLinkedClicked = false;
    this.currentUserVotes = SOC.currentUser.votes();
    this.currentUserVote = this.currentUserVotes.select(function (vote) {
        return vote.get("votable_id") === that.model.id;
    })[0];
    this.listenTo(this.comments, 'sync', this.renderComments);
    this.listenTo(this.comments, 'create', this.addComment);
    this.listenTo(this.model, 'sync', this.render);
  },  

  events: {
    'click #new-answer-comment-link': 'renderNewCommentForm',
    'click .answer-destroy': 'deleteAnswer',
    'click .answer-edit': 'editAnswerForm'    
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
    var view = new SOC.Views.NewAnswer({
      question: this.question,      
      collection: this.collection,
      model: this.model,
      superView: this
    });
    this.$el.html(view.render().$el);
  },

  render: function () {
    var that = this;
    var content = this.template({
      answer: this.model
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

  renderComments: function (e) {
    this.comments.each(this.addComment.bind(this));
    this.trigger("commentsRendered");
    console.log("commentsRendered!")
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
      commentable_type: "Answer",
      commentable_id: that.model.id,
      question_id: that.model.escape("question_id")
    });
    this.addSubview("#answer-commment-form", view);
  }
  
});
