SOC.Views.UsersIndex = Backbone.CompositeView.extend({
  template: JST['users/index'],

  initialize: function (options) {
    this.pageNum = options.pageNum
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      users: this.collection
    });
    this.$el.html(content);
    var $pager = this.generatePageChange()
    this.renderQuestions();
    // $pager.appendTo(this.$el)
    this.$('.pager').html($pager)
    return this;
  },
  
  renderUsers: function () {
    this.collection.each(this.addUser.bind(this));
  },
  
  addUser: function (question) {
    var view = new SOC.Views.QuestionRow({
      model: question
    });
    this.addSubview("#questions", view);
  },
  
  generatePageChange: function(){
    var pageNum = parseInt(this.pageNum);
    var $pager = $('<div />', {"class": 'pager'})
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
