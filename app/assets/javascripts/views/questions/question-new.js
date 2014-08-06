SOC.Views.NewQuestion = Backbone.CompositeView.extend({
  template: JST['questions/new'],
  
  initialize: function(){
    this.errors = [];
    this.listenTo(this.collection, 'sync', this.render);
    this.objectType = "tag",
    this.ownCollection = new SOC.Collections.Tags();
    this.listenTo(this.collection, 'tagAdded', this.renderTags);
    this.listenTo(this.collection, 'resetSearchBoxView', this.renderSearchBoxView);
  },

  events: {
    'click .tagAdd': 'renderTags',
    'submit form': 'submit'
  },



  render: function () {
    
    var content = this.template({question: this.model, errors: this.errors});
    this.$el.html(content);
    this.renderSearchBoxView();
    return this;
  },
  
  renderTags: function(){
    $(".tags").empty();
    this.ownCollection.each(function(tag){
      $(".tags").append($('<div class="btn btn-primary" style="margin-right: 20px;">' + tag.escape("name") + '</div>'))
    })
  },


  submit: function (event) {
    SOC.requireSignedIn()
    var that = this;
    
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON();
    this.model.set(params);

    this.model.save(params, {
      success: function(model, response){
        
        Backbone.history.navigate("questions/" + model.id, {trigger:true})
      },
      error: function (model, response, opts) {
        that.errors = response.responseJSON;
        that.model = model;
        that.render();
      }
    })
  },
  
  tagsLeft: function(){
    var that = this;
    if(that.ownCollection.length){ 
      return 5 - that.ownCollection.length;
    }
  },
  
  renderSearchBoxView: function(event){
    this.subviews(".search-box").forEach(function(subview){subview.remove()})
    var that = this;
    var showSearchBox = new SOC.Views.SearchBoxView({
      superView: this,
      objectType: "tag",
      collection: this.collection
    })
    this.addSubview(".search-box", showSearchBox)
  }

});
