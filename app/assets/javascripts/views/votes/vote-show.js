SOC.Views.ShowVote = Backbone.CompositeView.extend({

  template: JST["votes/cell"],

  events: {
    'click #upvote': 'plusVote',
    'click #downvote': 'minusVote'
  },


  initialize: function(options){
    this.model = options.model;
    this.superView = options.superView;
  },


  render: function () {
    var content = this.template({});
    this.$el.html(content);
    this.renderCurrentUserVote();
    return this;
  },



  renderCurrentUserVote: function(){
    v = this.model;
    var that = this;
    if(!v.id){
      that.$("#upvote").addClass("not-clicked");
      that.$("#downvote").addClass("not-clicked");
    } else if (v.get("value")===10){
      that.$("#upvote").addClass("up-clicked");
      that.$("#downvote").addClass("not-clicked");
    } else {
      that.$("#upvote").addClass("not-clicked");
      that.$("#downvote").addClass("up-clicked");
    }
  }


  // plusVote: function(){
  //   that = this;
  //   SOC.requireSignedIn();
  //   var $currentTarget = $("#upvote");
  //   if($currentTarget.hasClass("up-clicked")){
  //     var vote = that.currentUserVote
  //     vote.destroy()
  //     that.currentUserVote = null
  //     $currentTarget.removeClass("up-clicked");
  //     $currentTarget.addClass("not-clicked");
  //     that.render()
  //     }else{
  //     // if($("#downvote").hasClass("up-clicked")){
  //     //   that.minusVote();
  //     // }
  //     var vote = new SOC.Models.Vote({
  //       votable_type: "Question",
  //       votable_id: that.model.id,
  //       value: 10
  //     });
  //     that.currentUserVote
  //     vote.save()
  //     $currentTarget.addClass("up-clicked");
  //     $currentTarget.removeClass("not-clicked");
  //     that.currentUserVote = vote
  //     that.render()
  //   }
  // },
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