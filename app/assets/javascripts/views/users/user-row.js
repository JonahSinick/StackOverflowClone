SOC.Views.UserRow = Backbone.CompositeView.extend({
  template: JST['users/show-row'],


  render: function () {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    return this;
  }
  
});
