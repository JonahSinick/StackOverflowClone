SOC.Views.QuestionRow = Backbone.CompositeView.extend({
  template: JST['questions/show-row'],


  render: function () {
    var content = this.template({
      question: this.model
    });
    this.$el.html(content);
    return this;
  }
  
});
