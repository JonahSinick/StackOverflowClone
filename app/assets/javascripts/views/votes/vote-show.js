SOC.Views.ShowVote = Backbone.CompositeView.extend({

  template: JST["votes/cell"],

  events: {
    'click #upvote': 'plusVote',
    'click #downvote': 'minusVote'
  },


  initialize: function(options){
    var that = this;
    this.model;
    this.votable_type = options.votable_type;
    this.votable_id = options.votable_id;
    this.questionShow = options.questionShow;
    this.currentUserVote = options.currentUserVote;
    this.setModel();
    // this.listenTo(this.currentUserVoteId, 'change', this.render)
    // this.listenTo(this.currentUserVoteId, 'sync', this.render)

  },


  setModel: function(){
    var that = this;
    this.model = new SOC.Models.Vote({votable_type: that.votable_type, votable_id: that.votable_id});
    if(that.currentUserVote){
      that.model.set({id: that.currentUserVote.id, value: that.currentUserVote.value})
    }
  },

  render: function () {
    var that = this
    var content = this.template({});
    this.$el.html(content);
    this.renderCurrentUserVote();
    return this;
  },



  renderCurrentUserVote: function(){
    var vote = this.model;
    var that = this;
    if(!vote.id){
      that.$("#upvote").addClass("not-clicked");
      that.$("#downvote").addClass("not-clicked");
    } else if (vote.get("value")===10){
      that.$("#upvote").addClass("up-clicked");
      that.$("#downvote").addClass("not-clicked");
    } else {
      that.$("#upvote").addClass("not-clicked");
      that.$("#downvote").addClass("up-clicked");
    }
  },


  plusVote: function(){
    var that = this;
    SOC.requireSignedIn();
    var vote = that.model
    var $currentTarget = $("#upvote");
    if(vote.id){
      vote.destroy();
      vote.unset({id: null, value: null})
      $currentTarget.removeClass("up-clicked");
      $currentTarget.addClass("not-clicked");
      that.render()
    }else{
      // if($("#downvote").hasClass("up-clicked")){
      //   that.minusVote();
      // }
      vote.set({value: 10});
      vote.save()
      $currentTarget.addClass("up-clicked");
      $currentTarget.removeClass("not-clicked");
    }
  },
  //
  minusVote: function(){
    var that = this;
    SOC.requireSignedIn();
    var vote = that.model
    var $currentTarget = $("#downvote");
    if(vote.id){
      vote.destroy();
      vote.unset({id: null, value: null})
      $currentTarget.removeClass("up-clicked");
      $currentTarget.addClass("not-clicked");
      that.render()
    }else{
      // if($("#downvote").hasClass("up-clicked")){
      //   that.minusVote();
      // }
      vote.set({value: 10});
      vote.save()
      $currentTarget.addClass("up-clicked");
      $currentTarget.removeClass("not-clicked");
    }
  }


})