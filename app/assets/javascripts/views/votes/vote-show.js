SOC.Views.ShowVote = Backbone.CompositeView.extend({

  template: JST["votes/show"],

  events: {
    'click #upvote': 'plusVote',
    'click #downvote': 'minusVote',
  },


  initialize: function(options){
    var that = this;
    this.model;
    this.votable_type = options.votable_type;
    this.votable_id = options.votable_id;
    this.score = parseInt(options.score);
    this.magnitude;
    this.questionShow = options.questionShow;
    this.currentUserVote = options.currentUserVote;
    this.setModel();
    if(that.votable_type === "Question" || that.votable_type === "Answer"){
      that.magnitude = 10
    } else{
      that.magnitude = 1
    }
    this.listenTo(this.model, 'change', this.render);
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
    var content = this.template({score: this.score});
    this.$el.html(content);
    this.renderCurrentUserVote();
    return this;
  },



  renderCurrentUserVote: function(){
    var vote = this.model;
    var that = this;
    if(vote.id && (vote.escape("value") != 0)){
      if (vote.get("value")===10){
        that.$("#upvote").addClass("up-clicked");
      }else {
        that.$("#downvote").addClass("up-clicked");
      }      
    }
  },


  plusVote: function(){
    var that = this;
    SOC.requireSignedIn();
    var vote = that.model;
    var $currentTarget = $("#upvote");
    var $otherTarget = $("#downvote");
    if(vote.id && (vote.escape("value") != 0)){
      if(vote.escape("value") < 0){
        vote.set({value: that.magnitude});
        $currentTarget.addClass("up-clicked");
        $otherTarget.removeClass("up-clicked");
        that.score += 2
      } else{
        vote.set({value: 0});
        $currentTarget.removeClass("up-clicked");
        that.score -= 1
      }
    } else{
      vote.set({value: that.magnitude});
      $currentTarget.addClass("up-clicked");
      that.score += 1
      
    }
    vote.save();
  },
  //

  minusVote: function(){
    var that = this;
    SOC.requireSignedIn();
    var vote = that.model;
    var $currentTarget = $("#downvote");
    var $otherTarget = $("#upvote");
    if(vote.id && (vote.escape("value") != 0)){
      if(vote.escape("value") > 0){
        vote.set({value: -that.magnitude});
        $currentTarget.addClass("up-clicked");
        $otherTarget.removeClass("up-clicked");
        that.score -= 2
        
      } else{
        vote.set({value: 0});
        $currentTarget.removeClass("up-clicked");
        that.score += 1
        
      }
    } else{
      vote.set({value: - that.magnitude});
      $currentTarget.addClass("up-clicked");
      that.score -= 1
    }
    vote.save();
  }
  //



  // minusVote: function(){
  //   var that = this;
  //   SOC.requireSignedIn();
  //   var vote = that.model
  //   var $currentTarget = $("#downvote");
  //   if(vote.id){
  //     vote.destroy();
  //     vote.unset({id: null, value: null})
  //     $currentTarget.removeClass("up-clicked");
  //     $currentTarget.addClass("not-clicked");
  //     that.render()
  //   }else{
  //     // if($("#downvote").hasClass("up-clicked")){
  //     //   that.minusVote();
  //     // }
  //     vote.set({value: 10});
  //     vote.save()
  //     $currentTarget.addClass("up-clicked");
  //     $currentTarget.removeClass("not-clicked");
  //   }
  // }


})