SOC.Views.NewAnswer = Backbone.CompositeView.extend({
  template: JST['answers/new'],
  
  
  

  events: {
    'submit form': 'submit'
  },

  initialize: function(options){
    this.question = options.question;
    this.superView = options.superView;
    this.errors = [];
  },

  render: function () {
    var content = this.template({
      question: this.question,
      errors: this.errors
    });
    this.$el.html(content);
    this.delegateEvents();
    
    return this;
  },


  submit: function (event) {
    SOC.requireSignedIn()
    var that = this;
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON();
    this.model.set(params);
    this.collection.create(params, {
      success: function(model, response){
        Backbone.history.navigate("questions/" + that.question.id, {trigger:true})
        that.superView.render();
      },
      error: function (model, response, opts) {
        that.errors = response.responseJSON;
        that.render();
      }
    });
  }
});