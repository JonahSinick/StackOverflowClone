SOC.Views.ShowComment = Backbone.CompositeView.extend({
  template: JST['comments/show'],

  initialize: function(){
    this.currentUserVotes = SOC.currentUser.votes();
    this.listenTo(this.model, 'sync', this.render);
    
  },
  events: {
    'click .comment-destroy': 'deleteComment',
    'click .comment-edit': 'editCommentForm'

  },

  render: function () {
    var content = this.template({
      comment: this.model
    });
    this.$el.html(content);
    this.renderVoteCell();
    
    return this;    
  },
  
  renderVoteCell: function(){
    var that = this;
    this.currentUserVote = this.currentUserVotes.select(function (vote) {
        return vote.get("votable_id") === that.model.id;
    })[0];
    
    var that = this;
    var showVoteView = new SOC.Views.ShowVote({
      votable_type: "Comment", 
      votable_id: that.model.id, 
      currentUserVote: that.currentUserVote, 
      score: that.model.escape("score") 
    });
    this.addSubview("#comment-votecell", showVoteView)
  }, 
  
  
  deleteComment: function(){
    this.model.destroy();
    this.remove();
  },

  editAnswerForm: function(){
    var view = new SOC.Views.NewAnswer({
      question: this.question,      
      collection: this.collection,
      model: this.model,
      superView: this
    });
    this.$el.html(view.render().$el);
  }

  
});
