SOC.Views.NewComment = Backbone.CompositeView.extend({
  template: JST['comments/new'],
  
  //
  events: {
    'click .btn-failure': 'submit'
  },

  initialize: function(options){
    this.commentable_id = options.commentable_id;
    this.commentable_type = options.commentable_type;
    this.collection = options.collection;
    
    
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.delegateEvents();
    
    return this;
  },


  submit: function (event) {
    event.preventDefault();
      this.collection.create({
        body: this.$('textarea').val(),
        commentable_type: this.commentable_type,
        commentable_id: this.commentable_id
      }, { wait: true });
  }
  
});
