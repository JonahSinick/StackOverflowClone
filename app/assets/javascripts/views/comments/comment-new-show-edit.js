SOC.Views.CommentNewShowEdit = Backbone.CompositeView.extend({
  template: function(){
    return this.creatingOrEditing ? JST['comments/new'] : JST['comments/show'];
  },

  initialize: function(options){
    this.creating = options.creating;
    this.action = options.action;
    this.creatingOrEditing = this.creating ? true : false;
    this.collection = options.collection;
    this.superView = options.superView;
  },




  events: {
    'click #question-create-update-comment': 'questionCommentSubmit',
    'click #answer-create-update-comment': 'answerCommentSubmit',
    'click .comment-destroy': 'deleteComment',
    'click .comment-edit': 'swapTemplates'
  },
  
  swapTemplates: function(){
    this.creatingOrEditing = true;
    this.render();
  },
  
  questionCommentSubmit: function(){
    event.preventDefault();
    if(this.model.escape("commentable_type")==="Question"){
     this.submit(); 
    }
  },


  answerCommentSubmit: function(){
    event.preventDefault();
    if(this.model.escape("commentable_type")==="Answer"){
     this.submit(); 
    }
  },
  
  render: function () {
    var that = this;
    var content = this.template()({
      comment: that.model
    });
    this.$el.html(content);
    if(!that.creatingOrEditing){
      this.currentUserVote = SOC.currentUser.votes().select(function (vote) {
          return vote.get("votable_id") === that.model.id;
      })[0];

      that.renderVoteCell();
    }
    if(this.action==="show" || this.action==="new"){
      return this;
    }
    
  },
  
  
  renderVoteCell: function(){
    var that = this;
    var showVoteView = new SOC.Views.ShowVote({
      votable_type: "Comment", 
      votable_id: this.model.id, 
      currentUserVote: this.currentUserVote, 
      score: that.model.escape("score") 
    });
    this.addSubview("#comment-votecell", showVoteView)
  }, 
    
  
  deleteComment: function(){
    this.model.destroy();
    this.remove();
  },


  submit: function(){
    event.preventDefault();
    this.creatingOrEditing = false;
    
    var params = {
      body: $('textarea').val(),
      commentable_type: this.model.escape("commentable_type"),
      commentable_id: this.model.escape("commentable_id"),
      author_id: SOC.currentUser.id,
      author_name: SOC.currentUser.escape("username")
      };
    if(this.creating){
      this.collection.create(params, {trigger: false});
      this.creating = false;
      this.superView.model.trigger("newCommentCreated");
      this.model.set(params);      
    }
    else {
      this.model.set(params);
      this.model.save();
    }
    
    this.render();
  }
});
