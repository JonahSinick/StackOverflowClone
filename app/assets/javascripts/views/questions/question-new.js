SOC.Views.NewQuestion = Backbone.CompositeView.extend({
  template: JST['questions/new'],


  events: {
    'submit form': 'submit'
  },



  render: function () {
    var content = this.template({question: this.model});
    this.$el.html(content);
    this.delegateEvents();
    return this;
  },


  submit: function (event) {
    var that = this;
    
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON();
    this.model.set(params);

    this.model.save(null, {
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
