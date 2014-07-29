SOC.Views.NewComment = Backbone.CompositeView.extend({
  template: JST['comments/new'],
  
  initialize: function(options){
    this.commentable_id = options.commentable_id;
    this.commentable_type = options.commentable_type;
    this.superView = options.superView
    this.collection = options.collection;
    this.model = options.model;
    this.question_id = options.question_id
  },

  render: function () {
    var content = this.template({comment: this.model});
    this.$el.html(content);
    
    return this;
  }
});
