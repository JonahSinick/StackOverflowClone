SOC.Views.ShowComment = Backbone.CompositeView.extend({
  template: JST['comments/show'],
    
  events: {
    'click .comment-destroy': 'deleteComment'
  },

  render: function () {
    var content = this.template({
      comment: this.model
    });
    this.$el.html(content);
    return this;    
  },
  
  
  deleteComment: function(){
    this.model.destroy();
    this.remove();
  },
  
});
