SOC.Views.ShowQuestion = Backbone.CompositeView.extend({
  template: JST['questions/show'],

  initialize: function (options) {
    
    this.answers = this.model.answers();   
    this.comments = this.model.comments();   
    this.commentFormLinkedClicked = false;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.answers, 'create', this.addAnswer);
    this.listenTo(this.comments, 'add', this.addComment);
  },
  
  events: {
    'click #new-question-comment-link': 'renderNewCommentForm',
    'click #upvote': 'plusVote',
    'click #downvote': 'minusVote'
  },
  

  render: function () {
    var content = this.template({
      question: this.model
    });
    this.$el.html(content);
    this.renderCurrentUserVote();
    this.renderAnswers();
    this.renderNewAnswerForm();
    this.renderComments();
    if(this.commentFormLinkedClicked === false){
      this.renderCommentFormLink();
    };
    return this;
  },
  
  renderCurrentUserVote: function(){
    var v = SOC.currentUser.votes().get({votable_type: "Question", votable_id: this.model.id })
    if(!v){
      this.$("#upvote").addClass("not_clicked")
      this.$("#downvote").addClass("not_clicked")
    } else if (v.get("value")===10){
      this.$("#upvote").addClass("up_clicked")
      this.$("#downvote").addClass("not_clicked")
    } else {
      this.$("#upvote").addClass("not_clicked")
      this.$("#downvote").addClass("up_clicked")
    }
  },
  
  renderAnswers: function () {
    this.answers.each(this.addAnswer.bind(this));
    
  },
  
  addAnswer: function (answer) {
    var view = new SOC.Views.ShowAnswer({
      model: answer,
      superView: this
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
    this.comments.each(this.addComment.bind(this));
  },
  
  addComment: function (comment) {
    var view = new SOC.Views.ShowComment({
      model: comment
    });
    this.addSubview("#question-comments", view);
  },

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
      commentable_type: "Question",
      commentable_id: this.model.id,
      question_id: this.model.id
    });
    this.addSubview("#question-commment-form", view);
  },
  
  
  plusVote: function(){
    that = this;
    SOC.requireSignedIn();
    var $currentTarget = $("#upvote");
    if($currentTarget.hasClass("up-clicked")){
      var vote = new SOC.Models.Vote({
        votable_type: "Question",
        votable_id: this.model.id,
        value: 10
      });
      vote.destroy()
      $currentTarget.removeClass("up-clicked");
      $currentTarget.addClass("not-clicked");
    }else{
      if($("#downvote").hasClass("up_clicked")){
        that.minusVote;
      }
      var vote = new SOC.Models.Vote({
        votable_type: "Question",
        votable_id: this.model.id,
        value: 10
      });
      vote.save();
      $currentTarget.addClass("up-clicked");
      $currentTarget.removeClass("not-clicked");
      
    }
  },
  
  minusVote: function(){
    that = this;
    SOC.requireSignedIn();
    var $currentTarget = $("#downvote");
    if($currentTarget.hasClass("up-clicked")){
      var vote = new SOC.Models.Vote({
        votable_type: "Question",
        votable_id: this.model.id,
        value: -10
      });
      vote.destroy()
      $currentTarget.removeClass("up-clicked");
      $currentTarget.addClass("not-clicked");
    }else{
      if($("#upvote").hasClass("up_clicked")){
        that.plusVote;
      }
      
      var vote = new SOC.Models.Vote({
        votable_type: "Question",
        votable_id: this.model.id,
        value: -10
      });
      vote.save();
      $currentTarget.addClass("up-clicked");
      $currentTarget.removeClass("not-clicked"); 
         

    }
  },
});