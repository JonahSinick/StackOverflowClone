SOC.Models.User = Backbone.Model.extend({
  urlRoot: "/users",
  
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
      this._votes = new SOC.Collections.Votes([], { voter_id: this.id });
    }
    return this._votes;
    
  },
    
  parse: function (response) {

    if(response.authored_questions) {
      this.questions().set(response.authored_questions, { parse: true });
      delete response.authored_questions;
    }


    if(response.authored_answers) {
      this.answers().set(response.authored_answers, { parse: true });
      delete response.authored_answers;
    }

    if(response.authored_comments) {
      this.comments().set(response.authored_comments, { parse: true });
      delete response.authored_comments;
    }

    if(response.cast_votes) {
      this.votes().set(response.cast_votes, { parse: true });
      delete response.cast_votes;
    }


    return response;
  }
  
})