SOC.Views.NewQuestion = Backbone.CompositeView.extend({
  template: JST['questions/new'],


  events: {
    'click .btn-success': 'submit'
  },

  initialize: function(options){
    this.currentUser = options.currentUser;
    this.listenTo(this.currentUser, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      current_user: this.currentUser
    });
    this.$el.html(content);
    this.delegateEvents();
    return this;
  },


  submit: function (event) {
    event.preventDefault();
    var newQuestion = new SOC.Models.Question({
      title: this.$('#new-title').val(),        
      body: this.$('textarea').val(),
      author_id: this.$('#author_id').val(),
      author_name: this.$('#author_name').val(),
    })
    debugger
    newQuestion.save(null, {
      success: function(model, response){
        debugger
        Backbone.history.navigate("questions/" + model.id, {trigger:true})
      }
    })
  }
});
