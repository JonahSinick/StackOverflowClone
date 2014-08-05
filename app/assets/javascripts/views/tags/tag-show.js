SOC.Views.ShowTag = Backbone.CompositeView.extend({

  template: JST["tags/show"],
  
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var content = this.template({tag: this.model, questions: this.collection});
    this.$el.html(content);
    this.renderQuestionsTagged();
    return this;
  },

  renderQuestionsTagged: function() {
    var pageNum = 1;
    var taggedQuestions = new SOC.Views.IndexView({
      tag: this.model,
      collection: this.collection,
      typeOfIndex: "taggedQuestions",
      pageNum: pageNum
    });
    this.addSubview(".taggedQuestions", taggedQuestions)
  }
})