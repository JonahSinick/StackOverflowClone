SOC.Views.NewAnswer = Backbone.CompositeView.extend({
  template: JST['answers/new'],
  

  events: {
    'click .btn-success': 'submit'
  },

  initialize: function(options){
    this.currentUser = options.currentUser;
    
  },

  render: function () {
    var content = this.template({
      question: this.model,
      current_user: this.currentUser
    });
    this.$el.html(content);
    this.delegateEvents();
    
    return this;
  },


  submit: function (event) {
    event.preventDefault();
      this.collection.create({
        body: this.$('textarea').val(),
        author_id: this.$('#author_id').val(),
        author_name: this.$('#author_name').val(),
        question_id: this.model.id
      }, { wait: true });
      this.$('textarea').val('');
      this.$('textarea').focus();
  }
  
});
