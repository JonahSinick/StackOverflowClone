SOC.Views.ShowComment = Backbone.CompositeView.extend({
  template: JST['comments/show'],
    
  events: {
    'click .comment-destroy': 'deleteComment',
    'click .comment-edit': 'editCommentForm'

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

  editAnswerForm: function(){
    var view = new SOC.Views.NewAnswer({
      question: this.question,      
      collection: this.collection,
      model: this.model,
      superView: this
    });
    this.$el.html(view.render().$el);
  }

  
});
