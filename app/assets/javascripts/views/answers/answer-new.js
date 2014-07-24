SOC.Views.NewAnswer = Backbone.CompositeView.extend({
  template: JST['answers/new'],
  

  events: {
    'click .btn-success': 'submit'
  },

  initialize: function(options){
    
  },

  render: function () {
    var content = this.template({
      question: this.model
    });
    this.$el.html(content);
    this.delegateEvents();
    
    return this;
  },


  submit: function (event) {
    that = this;
    event.preventDefault();
    var newAnswer = new SOC.Models.Answer({
      body: this.$('textarea').val(),
      question_id: this.model.id
    })
    
    this.collection.create({
      body: this.$('textarea').val(),
      question_id: this.model.id
    },  
    {
      success: function(model, response){
        Backbone.history.navigate("questions/" + model.id, {trigger:true})
      },
      error: function (model, response, opts) {
        that.errors = response.responseJSON;
        that.render();
      }
    });
  }
});