SOC.Views.UserQuestions = Backbone.CompositeView.extend({
  template: JST['questions/index'],



  initialize: function (options) {
    this.type = options.type;
    this.pageNum = 1;
    SOC.questions.reset();
    this.questions = SOC.questions;
    this.questionFetch();
    this.listenTo(this.questions, 'sync', this.render);
  },
  
  events: {
    'click .page-numbers' : 'pageSwitch'
  },
  
  questionFetch: function(){
    var that = this;
    SOC.questions.fetch({ data: $.param({user_id: parseInt(that.model.escape("id")), page: that.pageNum, type: that.type}) }); 
  },
  
  pageSwitch: function(event){
    event.preventDefault()
    var pageNum = $(event.target).data('pagenum');
    this.pageNum = pageNum;
    this.questionFetch()    
    this.render();
  },

  
  render: function () {
    var content = this.template({
      typeOfIndex: "User " + this.type,
      questions: this.questions
    });
    this.$el.html(content);
    var $pager = this.generatePageChange()
    this.renderQuestions();
    // $pager.appendTo(this.$el)
    this.$('.pager').html($pager)
    return this;
  },
  

  renderQuestions: function () {
    this.questions.each(this.addQuestion.bind(this));
    
  },
  
  addQuestion: function (question) {
    var view = new SOC.Views.QuestionRow({
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
      $pager.append('<a href=#userQuestionPageNum' + previous + " data-pageNum=" + previous + '>' + '<span class="page-numbers"' + " data-pageNum=" + previous +  '> previous</span>' + '</a>');
    }
    $pager.append('<span class="page-numbers current">' + pageNum + '</span>')
    if(this.questions.length >= 15){
      var next = pageNum + 1
      $pager.append('<a href=#' + next + " data-pageNum=" + next + '>' +'<span class="page-numbers"'  + " data-pageNum=" + next +  '> next</span>' + '</a>');
    }
    return $pager
  }


  
});