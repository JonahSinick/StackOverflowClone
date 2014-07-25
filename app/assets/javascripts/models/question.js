SOC.Models.Question = Backbone.Model.extend({
  urlRoot: "api/questions",
  
  answers: function () {
    if(!this._answers) {
      this._answers = new SOC.Collections.Answers([], { question: this });
    }
    return this._answers;
  },
  
  comments: function () {
    if(!this._comments) {
      this._comments = new SOC.Collections.Comments([], { question: this });
    }
    return this._comments;
  },
    
  parse: function (response) {
    if(response.answers) {
      this.answers().set(response.answers, { parse: true });
      delete response.answers;
    }

    if(response.comments) {
      this.comments().set(response.comments, { parse: true });
      delete response.comments;
    }


    return response;
  }
  
})