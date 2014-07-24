SOC.Views.ShowAnswer = Backbone.CompositeView.extend({
  template: JST['answers/show'],
  
  

  render: function () {
    var content = this.template({
      answer: this.model
    });
    this.$el.html(content);
    return this;
  }
  
});
