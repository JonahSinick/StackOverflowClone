SOC.Models.User = Backbone.Model.extend({
  urlRoot: "api/users",
  
  questions: function () {
    if(!this._questions) {
      this._questions = new SOC.Collections.Questions([], { author_id: this.id, author_name: this.username });
    }
    return this._questions;
  },
  
  answers: function () {
    if(!this._answers) {
      this._answers = new SOC.Collections.Answers([], { author_id: this.id, author_name: this.username });
    }
    return this._answers;
  },
  
  comments: function () {
    if(!this._comments) {
      this._comments = new SOC.Collections.Comments([], { author_id: this.id, author_name: this.username });
    }
    return this._comments;
  },
  
  votes: function() {
    if(!this._votes) {
      this._votes = new SOC.Collections.Votes([], { user_id: this.id });
    }
    return this._votes;
    
  },
    
  parse: function (response) {

    if(response.questions) {
      this.questions().set(response.questions, { parse: true });
      delete response.questions;
    }


    if(response.answers) {
      this.answers().set(response.answers, { parse: true });
      delete response.answers;
    }

    if(response.comments) {
      this.comments().set(response.comments, { parse: true });
      delete response.comments;
    }

    if(response.votes) {
      this.votes().set(response.votes, { parse: true });
      delete response.votes;
    }


    return response;
  }
  
})