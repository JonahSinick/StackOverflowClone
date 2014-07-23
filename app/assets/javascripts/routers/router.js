SOC.Routers.Router = Backbone.Router.extend({
  
  routes: {
    "" : "questionsIndex",
    "questions/:id" : "showQuestion"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    that = this;
  },
  
  questionsIndex: function(){
    SOC.questions.fetch();

    var view = new SOC.Views.QuestionsIndex({
      collection: SOC.questions
    });

    this._swapView(view);
  },


  showQuestion: function(id){
    var that = this;
    this._getQuestion(id, function(question){
      var showView = new SOC.Views.ShowQuestion({model: question})
      that._swapView(showView);
    })
  },

  //
  _getQuestion: function (id, callback) {
    var question = SOC.questions.get(id);
    if (!question) {
      question = new SOC.Models.Question({
        id: id
      });

      question.fetch({
        success: function () {
          SOC.questions.add(question);
          callback(question);
        }
      });
    } else {
      callback(question);
    }
  },

  
  _swapView: function(view){
    if(this.currentView){
      this.currentView.remove();
    }
    this.$rootEl.html(view.render().$el);
    this.currentView = view
  }
})
