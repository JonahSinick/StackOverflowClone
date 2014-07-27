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
    this.currentUserVoteId = options.currentUserVoteId
    this.setModel();
    this.superView = options.superView;
    this.currentUserVoted = SOC.currentUser.votes().select(function(vote){return that.votable_id === vote.votable_id}).length;
    this.listenTo(this.currentUserVoteId, 'change', this.render)

  },


  setModel: function(){
    this.model = new SOC.Models.Vote({votable_type: that.votable_type, votable_id: that.votable_id});
  },

  render: function () {
    that = this
    console.log(that.currentUserVoteId)
    var content = this.template({});
    this.$el.html(content);
    this.renderCurrentUserVote();
    return this;
  },



  renderCurrentUserVote: function(){
    v = this.model;
    var that = this;
    if(!that.currentUserVoted){
      that.$("#upvote").addClass("not-clicked");
      that.$("#downvote").addClass("not-clicked");
    } else if (v.get("value")===10){
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
    if(that.currentUserVoted){
      var params = vote.attributes()
      vote.destroy({success: function(){
        that.setModel()
      }})
      that.currentUserVoted = false
      $currentTarget.removeClass("up-clicked");
      $currentTarget.addClass("not-clicked");
      that.render()
      }else{
      // if($("#downvote").hasClass("up-clicked")){
      //   that.minusVote();
      // }
      vote.set({value: 10});
      that.currentUserVoted = true
      vote.save()
      $currentTarget.addClass("up-clicked");
      $currentTarget.removeClass("not-clicked");
      that.render()
    }
  }
  //
  // minusVote: function(){
  //   that = this;
  //   SOC.requireSignedIn();
  //   var $currentTarget = $("#downvote");
  //   if($currentTarget.hasClass("up-clicked")){
  //     var vote = that.currentUserVote;
  //     vote.destroy();
  //     that.currentUserVote = new SOC.Models.Vote()
  //     $currentTarget.removeClass("up-clicked");
  //     $currentTarget.addClass("not-clicked");
  //   }else{
  //     if($("#upvote").hasClass("up_clicked")){
  //       that.plusVote();
  //     }
  //     var vote = new SOC.Models.Vote({
  //       votable_type: "Question",
  //       votable_id: that.model.id,
  //       value: -10
  //     });
  //     vote.save();
  //     that.currentUserVote = vote;
  //     $currentTarget.addClass("up-clicked");
  //     $currentTarget.removeClass("not-clicked");
  //   }
  // }
  //
  // setCurrentUserVote: function(){
  //   debugger
  //   that = this;
  //   var votes = SOC.currentUser.votes().where({ votable_type: 'Question', votable_id: that.model.id }, {wait: true});
  //   that.currentUserVote = votes[0]
  //   that.render();
  // },


})