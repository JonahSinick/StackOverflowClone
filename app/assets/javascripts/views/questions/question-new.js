SOC.Views.NewQuestion = Backbone.CompositeView.extend({
  template: JST['questions/new'],
  
  initialize: function(){
    this.errors = [];
    this.tagErrors;
    this.listenTo(this.collection, 'sync', this.render);
    this.objectType = "tag",
    this.ownCollection = new SOC.Collections.Tags();
    this.listenTo(this.collection, 'tagAdded', this.renderTags);
    this.listenTo(this.collection, 'resetSearchBoxView', this.renderSearchBoxView);
  },

  events: {
    'click .tagAdd': 'renderTags',
    'submit form': 'submit',
    'click .deleteTag': 'removeTag'
    
  },
  
  removeTag: function(event){
    var name = event.currentTarget.getAttribute("data")
    var html = '[data-removeLabel="' + name + '"]'
    var found = this.collection.find(function(tag){
      return tag.get('name') === name;
    }); 
    this.ownCollection.remove(found);
    this.$(html).remove();
    this.tagErrors = null;
    this.render();
  },





  render: function () {
    
    var content = this.template({question: this.model, errors: this.errors, tagErrors: this.tagErrors});
    this.$el.html(content);
    this.renderSearchBoxView();
    this.renderTags();
    return this;
  },
  
  renderTags: function(){
    $(".tags").empty();
    this.ownCollection.each(function(tag){
      $(".tags").append($('<div data-removeLabel="' + tag.escape("name") + '" class="votecell" style="padding-left: 15px;"><div class="vote btn btn-primary" style="font-size: 24px; background-color: #428bca;">' + tag.escape("name") + '</div><div class="votefiller"></div><div class="vote" style="text-align: center; background-color: white;"><a  class="deleteTag" data="' + tag.escape("name") + '" style="font-size: 16px;">remove</a></div></div>'))
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
        that.ownCollection.each(function(tag){
          var questionTag = new SOC.Models.QuestionTag({question_id: that.model.id, tag_id: tag.id})
          questionTag.save();
        })
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
