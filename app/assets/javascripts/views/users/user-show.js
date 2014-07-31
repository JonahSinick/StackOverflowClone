SOC.Views.ShowUser = Backbone.CompositeView.extend({
  template: JST['users/show'],

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.renderQuestionsAuthored);

  },

  events: {
    'click #description' : 'renderDescription',
    'click #questions-authored' : 'renderQuestionsAuthored',    
    'click #questions-upvoted' : 'renderQuestionsUpvoted'
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

  render: function () {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    return this;
  },
  

  renderDescription: function(){
    this.clearUserShowContent()
    var userDescription = new SOC.Views.UserDescription({
      model: this.model
    });
    this.addSubview("#user-show-content", userDescription)
  },

  renderQuestionsAuthored: function(){
    this.clearUserShowContent()
    var userQuestionsAuthored = new SOC.Views.UserQuestions({
      model: this.model,
      type: "authored"
    });
    this.addSubview("#user-show-content", userQuestionsAuthored)
  },


  renderQuestionsUpvoted: function(){
    this.clearUserShowContent();    
    var userQuestionsUpvoted = new SOC.Views.UserQuestions({
      model: this.model,
      type: "upvoted"
    });
    this.addSubview("#user-show-content", userQuestionsUpvoted)
  },


  clearUserShowContent: function(){
    _(this.subviews("#user-show-content")).each(function(subview) {
      subview.remove();
    });
  }  
});
