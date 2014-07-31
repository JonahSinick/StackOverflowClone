SOC.Views.QuestionsIndex = Backbone.CompositeView.extend({
  template: JST['questions/index'],

  initialize: function (options) {
    this.pageNum = options.pageNum
    this.listenTo(this.collection, 'sync', this.render);
  },
  
  events: {
    "click .search" : "search",
    "keyUp .search" : "search"
  },
  
  search: function() {
    var searched = $('.search-bar').val()
    this.collection.reset()
    this.collection.fetch({ data: $.param({ search: searched}) });
  },

  render: function () {
    var content = this.template({
      questions: this.collection,
      typeOfIndex: "All"
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
      $pager.append('<a href=#' + previous + " data-pageNum=" + previous + '>' + '<span class="page-numbers"' + " data-pageNum=" + previous +  '> previous</span>' + '</a>');
    }
    $pager.append('<span class="page-numbers current">' + pageNum + '</span>')
    if(this.collection.length >= 15){
      var next = pageNum + 1
      $pager.append('<a href=#' + next + " data-pageNum=" + next + '>' +'<span class="page-numbers"'  + " data-pageNum=" + next +  '> next</span>' + '</a>');
    }
    return $pager
  }
});
