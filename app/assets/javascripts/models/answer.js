SOC.Models.Answer = Backbone.Model.extend({
  urlRoot: "api/answers",
  
  comments: function () {
    if(!this._comments) {
      this._comments = new SOC.Collections.Comments([], { answer: this });
    }
    return this._comments;
  },

  current_user_vote: function () {
    if(!this._current_user_vote) {
      this._current_user_vote = new SOC.Models.Vote([], { question: this });
    }
    return this._current_user_vote;
  },

    
  parse: function (response) {
    if(response.comments) {
      this.comments().set(response.comments, { parse: true });
      delete response.comments;
    }
  return response;

    if(response.current_user_vote) {
      this.current_user_vote().set(response.current_user_vote, { parse: true });
      delete response.current_user_vote;
    }
  
  }
  
  
  
  
})