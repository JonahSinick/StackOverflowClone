SOC.Views.TagCell = Backbone.CompositeView.extend({
  template: JST['tags/index-cell'],

  render: function () {
    var content = this.template({tag: this.model});
    this.$el.html(content);
    return this;
  }  
});
