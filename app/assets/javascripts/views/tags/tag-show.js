SOC.Views.ShowTag = Backbone.CompositeView.extend({

  template: JST["tags/show"],
  
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.render);
  },


  render: function () {
    var content = this.template({tag: this.model, questions: this.collection});
    this.$el.html(content);
    return this;
  }

})