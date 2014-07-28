SOC.Models.Comment = Backbone.Model.extend({
  urlRoot: "api/comments",

  current_user_vote: function () {
    if(!this._current_user_vote) {
      this._current_user_vote = new SOC.Model.Vote([], { question: this });
    }
    return this._current_user_vote;
  },


  parse: function (response) {

    if(response.current_user_vote) {
      this.current_user_vote().set(response.current_user_vote, { parse: true });
      delete response.current_user_vote;
    }
  
  }


})