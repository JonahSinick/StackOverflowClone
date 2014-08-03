SOC.Views.ShowUser = Backbone.CompositeView.extend({
  template: JST['users/show'],

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.pageNum = 1;

  },

  events: {
    'click #questions-authored' : 'renderQuestionsAuthored',    
    'click #questions-upvoted' : 'renderQuestionsUpvoted',
    'click .descriptionDelete': 'deleteDescription',
    'click .descriptionEdit': 'editDescription'
    
  },

  render: function () {
    var content = this.template({
      questions: this.collection
    });
    this.$el.html(content);
    var $pager = this.generatePageChange()
    // $pager.appendTo(this.$el)
    this.$('.pager').html($pager)
    return this;
  },

  render: function () {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    return this;
  },


  renderQuestionsAuthored: function(){    var pageNum = 1;

    var that = this;
    SOC.questions.fetch({ data: $.param({user_id: parseInt(that.model.escape("id")), page: pageNum, type: "authored"}) }); 

    this.clearUserShowContent()
    var userQuestionsAuthored = new SOC.Views.IndexView({
      user: this.model,
      collection: SOC.questions,
      typeOfIndex: "authoredQuestions",
      pageNum: pageNum
    });
    this.addSubview("#user-show-content", userQuestionsAuthored)
  },


  renderQuestionsUpvoted: function(){
    var pageNum = 1;
    var that = this;
    SOC.questions.fetch({ data: $.param({user_id: parseInt(that.model.escape("id")), page: pageNum, type: "upvoted"}) }); 
    this.clearUserShowContent();    
    var userQuestionsUpvoted = new SOC.Views.IndexView({
      model: this.model,
      collection: SOC.questions,
      typeOfIndex: "upvotedQuestions",
      pageNum: pageNum
    });
    this.addSubview("#user-show-content", userQuestionsUpvoted)    
  },

  clearUserShowContent: function(){
    _(this.subviews("#user-show-content")).each(function(subview) {
      subview.remove();
    });
  },
  
  deleteDescription: function(){
    event.preventDefault();
    this.model.set({description: ""})
    this.model.save();
    this.render();
  },

  editDescription: function(){
    event.preventDefault();
    this.creatingOrEditing = true;
    this.render();
  }
  
});
