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
    this.listenTo(this.model, 'change', this.render)
  },




  events: {
    'click .questionCreateUpdateComment': 'questionCommentSubmit',
    'click .answerCreateUpdateComment': 'answerCommentSubmit',
    'click .commentDestroy': 'deleteComment',
    'click .commentEdit': 'swapTemplates'
  },
  
  swapTemplates: function(event){
    event.preventDefault();
    this.creatingOrEditing = true;
    this.render();
  },
  
  questionCommentSubmit: function(event){
    event.preventDefault();
    if(this.model.escape("commentable_type")==="Question"){
     this.submit({type: ".questionTextToCreateUpdateComment"}); 
    }
  },


  answerCommentSubmit: function(event){
    event.preventDefault();
    if(this.model.escape("commentable_type")==="Answer"){
     this.submit({type: ".answerTextToCreateUpdateComment"}); 
    }
  },
  
  render: function () {
    var that = this;
    var content = this.template()({
      comment: that.model
    });
    this.$el.html(content);
    if(!that.creatingOrEditing){
      that.renderVoteCell();
    }
    if(this.action==="show" || this.action==="new"){
      return this;
    }
    
  },
  
  
  renderVoteCell: function(){
    this.$(".commentVoteCell").empty();
    var that = this;
    this.currentUserVote = SOC.currentUser.votes().select(function (vote) {
        return vote.get("votable_id") === that.model.id;
    })[0];
    var currentUserVote = that.currentUserVote || null
    var showVoteView = new SOC.Views.ShowVote({
      votable_type: "Comment", 
      votable_id: that.model.id, 
      currentUserVote: currentUserVote, 
      score: that.model.escape("score") 
    });
    this.addSubview(".commentVoteCell", showVoteView)
  }, 
    
  
  deleteComment: function(event){
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },


  submit: function(options){
    
    var that = this;
    event.preventDefault();
    this.creatingOrEditing = false;
    
    var params = {
      body: this.$(options.type).val(),
      commentable_type: this.model.escape("commentable_type"),
      commentable_id: this.model.escape("commentable_id"),
      author_id: SOC.currentUser.id,
      author_name: SOC.currentUser.escape("username")
      };
    if(this.creating){
      this.model.save(params, {})
      this.collection.add(that.model)
    }
    else {
      that.model.set(params);
      that.model.save();
    }
    that.creating = false;
    that.creatingOrEditing = false;
  }
});
