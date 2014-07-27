SOC.Views.QuestionsIndex = Backbone.CompositeView.extend({
  template: JST['questions/index'],

  initialize: function (options) {
    this.pageNum = options.pageNum
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      questions: this.collection
    });
    this.$el.html(content);
    var $pager = this.generatePageChange()
    this.renderQuestions();
    // $pager.appendTo(this.$el)
    this.$('.pager').html($pager)
    return this;
  },
  
  renderQuestions: function () {
    this.collection.each(this.addQuestion.bind(this));
  },
  
  addQuestion: function (question) {
    var view = new SOC.Views.QuestionRow({
      model: question
    });
    this.addSubview("#questions", view);
  },
  
  generatePageChange: function(){
    var pageNum = parseInt(this.pageNum);
    var $pager = $('<div />', {"class": 'pager'})
    if(pageNum > 1){
      var previous = pageNum - 1
      $pager.append('<a href=#' + previous + '>' + '<span class="page-numbers next">previous</span>' + '</a>');      
    }
    $pager.append('<span class="page-numbers current">' + pageNum + '</span>')
    for (var i = pageNum + 1; i < pageNum + 5; i++) {
      var a = '<a href=#' + i + '>' + '<span class="page-numbers">' + i + '</span>' + '</a>';
      $pager.append(a);
    }
    $pager.append('<span class="page-numbers dots">…</span>')
    var numPages = this.collection;
    var next = pageNum + 1
    $pager.append('<a href=#' + next + '>' + '<span class="page-numbers next">next</span>' + '</a>');
    return $pager
  }
});
