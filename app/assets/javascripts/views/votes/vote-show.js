SOC.Views.ShowVote = Backbone.CompositeView.extend({

  template: JST["votes/show"],

  events: {
    'click .upvote': 'plusVote',
    'click .downvote': 'minusVote',
    "changeVote" : "updatePage"

  },


  initialize: function(options){
    var that = this;
    this.model;
    this.question_id = parseInt(options.question_id);
    this.votable_type = options.votable_type;
    this.votable_id = options.votable_id;
    this.author_id = parseInt(options.author_id);
    this.currentUserVote = options.currentUserVote;
    if(!that.currentUserVote || that.currentUserVote.escape("value")===""){
      that.voteValue = 0
    }else{
      that.voteValue = parseInt(that.currentUserVote.escape("value"));      
    }
    this.score = options.score
    this.scoreFromOthers = this.score - this.voteValue;
    this.questionShow = options.questionShow;

    this.setModel();
    this.listenTo(this.model, 'changeVote', this.updatePage);
  },


  setModel: function(){
    var that = this;
    this.model = new SOC.Models.Vote({votable_type: that.votable_type, votable_id: that.votable_id});
    if(that.currentUserVote){
      that.model.set({id: that.currentUserVote.id, value: that.currentUserVote.value})
    }    
  },

  render: function () {
    this.score = this.scoreFromOthers + this.voteValue;
    var content = this.template({score: this.score});
    this.$el.html(content);
    this.renderCurrentUserVote();
    return this;
  },
  
  updatePage: function(){
    var vote = this.model;    
    var that = this;
    vote.set({value: that.voteValue, score_from_others: that.scoreFromOthers});
    vote.save();
    this.render();
  },



  renderCurrentUserVote: function(){
    var vote = this.model;
    var that = this;
    if(that.voteValue === 1){
      that.$(".upvote").addClass("up-clicked");
      that.$(".downvote").removeClass("up-clicked");
    }else if (that.voteValue === -1){
      that.$(".downvote").addClass("up-clicked");
      that.$(".upvote").removeClass("up-clicked");
    } else{
      that.$(".upvote").removeClass("up-clicked");      
      that.$(".downvote").removeClass("up-clicked");
    }
  },

  plusVote: function(event){
    var that = this;
    event.preventDefault()
    if(!SOC.currentUserId){
      window.location.href = ("/session/new?previous_url=questions/" + that.question_id + "&errors=You+must+be+signed+in+to+vote");
      return false;
    }; 
    if(SOC.currentUser.id === this.author_id){
      SOC.requireDifferentUser();
      return false;
    }; 
    var that = this;
    if(that.voteValue === 1){
      that.voteValue = 0;
    }else{
      that.voteValue = 1;
    }
    this.model.trigger("changeVote");
      // if(vote.escape("value") < 0){
      //   vote.set({value: that.magnitude});
      //   $currentTarget.addClass("up-clicked");
      //   $otherTarget.removeClass("up-clicked");
      //   that.sign = 1;
      // } else{
      //   vote.set({value: 0});
      //   $currentTarget.removeClass("up-clicked");
      // }
    // } else{
    //   vote.save();
  },
  //

  minusVote: function(event){
    event.preventDefault();    
    if(!SOC.currentUserId){
      window.location.href = ("/session/new?previous_url=questions/" + that.question_id);
    }; 
    if(SOC.currentUser.id === this.author_id){
      SOC.requireDifferentUser();
      return false;
    }; 
    var that = this;
    if(that.voteValue === -1){
      that.voteValue = 0;
    }else{
      that.voteValue = -1;
    }
    this.model.trigger("changeVote");
    // var $currentTarget = $("#downvote");
    // var $otherTarget = $("#upvote");
    // if(vote.id && (vote.escape("value") != 0)){
    //   if(vote.escape("value") > 0){
    //     vote.set({value: -that.magnitude});
    //     $currentTarget.addClass("up-clicked");
    //     $otherTarget.removeClass("up-clicked");
    //     that.score -= 2
    //
    //   } else{
    //     vote.set({value: 0});
    //     $currentTarget.removeClass("up-clicked");
    //     that.score += 1
    //
    //   }
    // } else{
    //   vote.set({value: - that.magnitude});
    //   $currentTarget.addClass("up-clicked");
    //   that.score -= 1
    // }
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