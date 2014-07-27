SOC.Views.ShowUser = Backbone.CompositeView.extend({
  template: JST['users/show'],

  initialize: function (options) {
    this.questions = this.model.questions();   

    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.questions, 'create', this.addQuestion);
    
  },


  render: function () {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    this.renderQuestions();
    var $pager = this.generatePageChange()

    this.$('.pager').html($pager)
    return this;    
  },

  renderQuestions: function () {
    this.questions.each(this.addQuestion.bind(this));
    
  },
  
  addQuestion: function (question) {
    
    var view = new SOC.Views.ShowRow({
      model: question,
      superView: this
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
