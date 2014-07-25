SOC.Views.NewComment = Backbone.CompositeView.extend({
  template: JST['comments/new'],
  
  //
  events: {
    'click #new-comment-button': 'submit'
  },

  initialize: function(options){
    this.commentable_id = options.commentable_id;
    this.commentable_type = options.commentable_type;
    this.superView = options.superView
    this.collection = options.collection;
    this.model = options.model;
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.delegateEvents();
    
    return this;
  },


  submit: function (event) {
    var that = this;
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON();
    
    event.preventDefault();
    this.collection.create({
      body: this.$('textarea').val(),
      commentable_type: this.commentable_type,
      commentable_id: this.commentable_id
    }, { wait: true });
    this.collection.create(params, {
      success: function(model, response){
        Backbone.history.navigate("questions/" + that.question.id, {trigger:true})
      },
      error: function (model, response, opts) {
        that.errors = response.responseJSON;
        that.render();
      }
    });
  }
  
});
