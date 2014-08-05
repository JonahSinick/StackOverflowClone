SOC.Views.CommentNewShowEdit = Backbone.CompositeView.extend({
  template: function(){
    return this.creatingOrEditing ? JST['comments/new'] : JST['comments/show'];
  },

  initialize: function(options){
    this.creating = options.creating;
    this.action = options.action;
    this.question_id = options.question_id;
    this.creatingOrEditing = this.creating ? true : false;
    this.collection = options.collection;
    this.superView = options.superView;
    this.errors = [];
    this.listenTo(this.model, 'change', this.render)
  },




  events: {
    'click .createUpdateComment': 'submit',
    'click .cancelCreateUpdateComment': 'cancelCreateOrEdit',

    'click .commentDestroy': 'deleteComment',
    'click .commentEdit': 'showEditView',
    'keydown': 'keyAction'    
  },
  

  
  showEditView: function(event){
    event.preventDefault();
    this.creatingOrEditing = true;
    this.render();
  },
  
  cancelCreateOrEdit: function(event){
    if(event){
      event.preventDefault();
    }
    this.creatingOrEditing = false;
    this.superView.model.trigger("revertToCommentFormLink")    
    if(!this.model.id){
      this.remove();
    } else{
      this.render();
    }
  },
  
  
  render: function () {
    var that = this;
    var content = this.template()({
      comment: that.model,
      errors: that.errors,
      creating: that.creating
    });
    this.$el.html(content);
    if(!that.creating && (that.model.id)){
      that.renderVoteCell();
    }
    if(this.action==="show" || this.action==="new"){
      return this;
    }
    
  },
  
  
  renderVoteCell: function(){
    this.$(".votecell").empty();
    var that = this;
    this.currentUserVote = SOC.currentUser.votes().select(function (vote) {
        return vote.get("votable_id") === that.model.id;
    })[0];
    var currentUserVote = that.currentUserVote || null
    var showVoteView = new SOC.Views.ShowVote({
      votable_type: "Comment", 
      votable_id: that.model.id, 
      currentUserVote: currentUserVote, 
      author_id: that.model.escape("author_id"),
      score: that.model.escape("score"),
      question_id: that.question_id,
      superView: this      
    });
    this.addSubview(".votecell", showVoteView)
  }, 
    
  
  deleteComment: function(event){
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },
  


  submit: function(){
    var that = this;
    event.preventDefault();
    
    var params = {
      body: this.$(".textToCreateUpdateComment").val(),
      commentable_type: this.model.escape("commentable_type"),
      commentable_id: this.model.escape("commentable_id"),
      author_id: SOC.currentUser.id,
      author_name: SOC.currentUser.escape("username")
      };

    that.model.set(params);
    that.model.save(null, {
      success: function(model, response){
        if(that.creating){          
          that.collection.add(that.model)
          that.creating = false;
        }
        that.errors = []
        that.cancelCreateOrEdit();
      },
      error: function (model, response, opts) {
        that.errors = response.responseJSON;
        that.render();
      }
    })
  },
  
  keyAction: function(e){
    if(this.creatingOrEditing){
      var code = e.keyCode || e.which;
      if(code == 13) { 
        e.preventDefault();
        this.submit();
      }
    }
  }
});

