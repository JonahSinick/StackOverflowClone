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
    this.question_id = options.question_id
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
    var params = { 
      comment: {
        body: $('textarea').val(),
        commentable_type: that.commentable_type,
        commentable_id: that.commentable_id
      }
    };
    this.collection.create(params, {
      success: function(model, response){
        Backbone.history.navigate("questions/" + that.question_id, {trigger:true})
        that.superView.commentFormLinkedClicked = false;
        that.superView.render()   
      },
      error: function (model, response, opts) {
        that.errors = response.responseJSON;
        that.render();
      }
    })
  }
});
