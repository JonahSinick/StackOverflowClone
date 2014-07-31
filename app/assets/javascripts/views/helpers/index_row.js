SOC.Views.IndexRow = Backbone.CompositeView.extend({
  template: JST['helpers/index-row'],
  
  initialize: function(options) {
    this.model = options.model;
    this.modelType = options.modelType;
  },
  render: function () {
    var content = this.template({
      model: this.model,
      modelType: this.modelType
    })
    this.$el.html(content);
    return this;
  }
});
