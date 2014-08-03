SOC.Views.UserDescription = Backbone.CompositeView.extend({
  template: function(){
    return this.creatingOrEditing ? JST['users/description-new'] : JST['users/description-show'];
  },
  
  initialize: function (options) {
    this.creating = options.creating;
    if(this.model.escape("description") === ""){
      this.creatingOrEditing = true;
    } else{
      this.creatingOrEditing = false;
    } 
    this.listenTo(this.model, 'change', this.render)
  },  

  events: {
    'click .destroy': 'deleteDescription',
    'click .edit': 'editDescription',
    'click .descriptionSubmit': 'submit'

  },
  
  render: function () {

    var that = this;
    var content = this.template()({
      user: this.model,
      creatingOrEditing: this.creatingOrEditing
    });
    this.$el.html(content);
    if(this.creating){
      return this;
    };
    return this;
  },
  
  
  deleteDescription: function(){
    event.preventDefault();
    this.model.set({description: ""})
    this.model.save()
    this.remove();
  },

  editDescription: function(){
    event.preventDefault();
    this.creatingOrEditing = true;
    this.render();
  },
  
  submit: function(){
    event.preventDefault();
    var that = this;
    this.model.set({description: that.$("#user-description").val()});
    this.model.save(null, {
      success: function(){
        that.creating = false
        that.creatingOrEditing = false;
        that.render();
      }
    });
  }
})