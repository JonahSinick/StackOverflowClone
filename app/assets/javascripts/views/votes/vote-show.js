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
    debugger
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
    if(that.currentUserVoteId){
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