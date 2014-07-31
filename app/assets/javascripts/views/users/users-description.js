SOC.Views.UserDescription = Backbone.CompositeView.extend({
  template: JST['users/description'],



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
    var that = this
    SOC.questions.fetch({ data: $.param({author_id: parseInt(that.model.escape("id")), page: that.pageNum, type: that.type}) }); 
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
      user: this.model
    });
    this.renderQuestions();
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

  
  
});