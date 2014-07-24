SOC.Views.NewQuestion = Backbone.CompositeView.extend({
  template: JST['questions/new'],


  events: {
    'click .btn-success': 'submit'
  },



  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.delegateEvents();
    return this;
  },


  submit: function (event) {
    this = that
    event.preventDefault();
    var newQuestion = new SOC.Models.Question({
      title: this.$('#new-title').val(),        
      body: this.$('textarea').val()
    })

    newQuestion.save(null, {
      success: function(model, response){
        Backbone.history.navigate("questions/" + model.id, {trigger:true})
      },
      error: function (model, response, opts) {
        that.errors = response.responseJSON;
        that.render();
      }
    })
  }
});
