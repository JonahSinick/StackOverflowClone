SOC.Routers.Router = Backbone.Router.extend({
  
  routes: {
    "" : "questionsIndex",
    "users" : "usersIndex",
    "users/:id" : "showUser",

    ":pageNum" : "questionsIndex",

    "users/page/:pageNum" : "usersIndex",
    "questions/new" : "newQuestion",

    "questions/:id" : "showQuestion",
    "tags/" : "showTags",   
    "tags/:id" : "showTag"
    
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    SOC.currentUser.fetch();
  },
  

  
  questionsIndex: function(pageNum){
    if(pageNum===null){
      var pageNum = 1;
    }
    SOC.questions.reset()
    SOC.questions.fetch({ data: $.param({ page: pageNum}) });

    var view = new SOC.Views.IndexView({
      collection: SOC.questions,
      pageNum: pageNum,
      typeOfIndex: "questionsIndex"
    });
    this._swapView(view);
  },

  usersIndex: function(pageNum){
    if(pageNum===null){
      var pageNum = 1;
    }
    SOC.users.reset()
    SOC.users.fetch({ data: $.param({ page: pageNum}) });

    var view = new SOC.Views.IndexView({
      collection: SOC.users,
      pageNum: pageNum,
      typeOfIndex: "usersIndex"
    });
    this._swapView(view);
  },


  newQuestion: function(){
    if(!SOC.currentUserId){
      window.location.href = "/session/new?previous_url=questions/new&errors=You+must+be+signed+in+to+ask+a+new+question";
      return false;
    };    
    var question  = new SOC.Models.Question();
    var newView = new SOC.Views.NewQuestion({model: question});
    this._swapView(newView);
    
  },


  showQuestion: function(id){
    SOC.currentUser.fetch();
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

  showTag: function(id){
    var tag = new SOC.Models.Tag({id: id})
    tag.fetch();
    var tagQuestions = new SOC.Collections.Questions();
    tagQuestions.fetch({ data: $.param({ tagId: id}) });
    var showView = new SOC.Views.ShowTag({model: tag, collection: tagQuestions});
    this._swapView(showView);
  },



  showUser: function(id){
    var user = SOC.users.get(id);
    if(!user || user.answers().length === 0){
      var user = new SOC.Models.User({
        id: id
      });
      user.fetch();
      SOC.users.remove(id);
      SOC.users.add(user);
    }
    var showView = new SOC.Views.ShowUser({model: user});
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
