SOC.Models.Question = Backbone.Model.extend({
  urlRoot: "api/questions",
  
  answers: function () {
    if(!this._answers) {
      this._answers = new SOC.Collections.Answers([], { model: this });
    }
    return this._answers;
  },
  
  
  parse: function (response) {
    if(response.lists) {
      this.answers().set(response.answers, { parse: true });
      delete response.answers;
    }

    return response;
  }
  
})