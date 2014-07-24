SOC.Routers.Router = Backbone.Router.extend({
  
  routes: {
    "" : "questionsIndex",
    ":pageNum" : "questionsIndex",
    "questions/new" : "newQuestion",

    "questions/:id" : "showQuestion",
    "users/:id" : "showUser"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;    
  },
  

  
  questionsIndex: function(pageNum){
    if(pageNum===null){
      var pageNum = 1;
    }
    SOC.questions.reset()
    SOC.questions.fetch({ data: $.param({ page: pageNum}) });

    var view = new SOC.Views.QuestionsIndex({
      collection: SOC.questions,
      pageNum: pageNum
    });
    this._swapView(view);
  },


  newQuestion: function(){
    var newView = new SOC.Views.NewQuestion();
    this._swapView(newView);
    
  },


  showQuestion: function(id){
    var question = SOC.questions.get(id);
    if(!question || question.answers().length === 0){
      var question = new SOC.Models.Question({
        id: id
      });
      question.fetch();
      SOC.questions.remove(id);
      SOC.questions.add(question);
    }
    var showView = new SOC.Views.ShowQuestion({model: question});
    this._swapView(showView);
  },

  // showUser: function(id){
  //   var user = SOC.users.get(id);
  //   if(!user || user.answers().length === 0){
  //     var user = new SOC.Models.User({
  //       id: id
  //     });
  //     user.fetch();
  //     SOC.users.remove(id);
  //     SOC.users.add(user);
  //   }
  // },
  

  //
  // _getQuestion: function (id, callback) {
  //   var user = SOC.users.get(id);
  //   if (!question) {
  //     question = new SOC.Models.Question({
  //       id: id
  //     });
  //     question.fetch({
  //       success: function () {
  //         SOC.questions.add(question);
  //         callback(question);
  //       }
  //     });
  //   } else {
  //     callback(question);
  //   }
  // },

  
  _swapView: function(view){
    if(this.currentView){
      this.currentView.remove();
    }
    this.$rootEl.html(view.render().$el);
    this.currentView = view
  }
})
