SOC.Routers.Router = Backbone.Router.extend({
  
  routes: {
    "" : "questionsIndex",
    "/questions/:id" : "showQuestion"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    that = this;
  },
  
  questionsIndex: function(){
    debugger
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
    var user = SOC.users.get(id);
    if (!user) {
      user = new SOC.Models.User({
        id: id
      });

      user.fetch({
        success: function () {
          SOC.users.add(user);
          callback(user);
        }
      });
    } else {
      callback(user);
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
