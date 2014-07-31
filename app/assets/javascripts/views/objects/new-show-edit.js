SOC.Views.NewShowEdit = Backbone.CompositeView.extend({
  template: function(){
    return this.creatingOrEditing ? JST['objects/new'] : JST['objects/show'];
  },

  initialize: function(options){
    this.creating = options.creating;
    this.action = options.action;
    this.creatingOrEditing = this.creating ? true : false;
    this.collection = options.collection;
    this.superView = options.superView;
    this.class = options.class;
    this.errors = [];
    this.listenTo(this.model, 'change', this.render)
  },




  events: {
    'click .createUpdate': 'submit',
    'click .cancelCreateUpdate': 'cancelCreateOrEdit',

    'click .objectDestroy': 'deleteObject',
    'click .objectEdit': 'showEditView'
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
    this.superView.model.trigger("revertToFormLink");
    if(!this.model.id){
      this.remove();
    } else{
      this.render();
    }
  },
  
  
  render: function () {
    var that = this;
    var content = this.template()({
      object: that.model,
      errors: that.errors
    });
    this.$el.html(content);
    if(!that.creatingOrEditing && (that.model.id)){
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
      votable_type: that.class, 
      votable_id: that.model.id, 
      currentUserVote: currentUserVote, 
      score: that.model.escape("score") 
    });
    this.addSubview(".votecell", showVoteView);
  }, 
    
  
  deleteObject: function(event){
    event.preventDefault();
    this.model.destroy();
    this.remove();
  },
  
  params: function(){
    
  },
  

  submit: function(){
    event.preventDefault();
    var params = this.params();
    var that = this;    
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
  }
});




