SOC.Routers.Router = Backbone.Router.extend({
  
  routes: {
    "users" : "userIndex"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    that = this;
  },
  
  userIndex: function(){
    that = this
    
    SOC.users.fetch({
      success: function(){
        usersView = new SOC.Views.UsersIndex({
          collection: SOC.users
        });
        that._swapView(usersView);        
      }
    });
  },

  show: function(id){
    var that = this;
    this._getUser(id, function(user){
      var showView = new SOC.Views.ShowUser({model: user})
      that._swapView(showView);
    })

  },

  
  _getUser: function (id, callback) {
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
