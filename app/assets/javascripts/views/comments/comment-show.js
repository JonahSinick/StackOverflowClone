SOC.Views.ShowComment = Backbone.CompositeView.extend({
  template: JST['comments/show'],
    

  render: function () {
    var content = this.template({
      comment: this.model
    });
    this.$el.html(content);
    return this;    
  }
});
