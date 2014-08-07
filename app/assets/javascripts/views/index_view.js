SOC.Views.IndexView = Backbone.CompositeView.extend({
  
  template: JST["helpers/index"],
  
  initialize: function (options) {
    this.pageNum = options.pageNum;
    this.collection = options.collection;
    this.typeOfIndex = options.typeOfIndex;
    this.modelType;
    this.type;
    this.setModelTypeAndRequestType();
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.renderNoResults);
    this.listenTo(this.collection, 'sync', this.renderPager);
  },
  
  events: {
    'click .page-numbers.moving' : 'pageSwitch',
    'resetSearchBox' : "renderSearchBoxView"
  },
  
  render: function () {
    this.rowColor = 1;
    var content = this.template({
      collection: this.collection,
      modelType: this.modelType,
      typeOfIndex: this.typeOfIndex,
    });
    this.$el.html(content);
    this.renderCollection();
    this.renderSearchBoxView();
    return this;
  },
  
  setModelTypeAndRequestType: function(){
    if(this.typeOfIndex === "authoredQuestions"){
        this.modelType = "question";
        this.type = "authored";
    }
    if(this.typeOfIndex === "upvotedQuestions"){
        this.modelType =  "question";
        this.type = "upvoted";
    }
    if(this.typeOfIndex === "questionsIndex"){
        this.modelType = "question";
    }
    
    if(this.typeOfIndex === "usersIndex"){
      this.modelType = "user";
    }    
    if(this.typeOfIndex === "taggedQuestions"){
      this.modelType = "question";
    }    
  },
  
  renderPager: function(){
    if(this.collection.length > 0){
      var $pager = this.generatePageChange()
      this.$('.pager').html($pager)          
    }
  },

  renderNoResults: function(){
    if(this.collection.length === 0){
      var $noResults = $("<div style='margin-top: 50px; padding-top: 50px; border-top: 1px solid LightGrey; font-size: 24px;'><div>No Results</div></div>")
      this.$('.noResults').html($noResults)          
    }
  },

  
  pageSwitch: function(event){
    event.preventDefault()
    var pageNum = $(event.target).data('pagenum');
    this.pageNum = pageNum;
    this.collectionFetch()    
    this.render();
  },
  
  collectionFetch: function(){
    var that = this;
    this.collection.fetch({ data: $.param({page: that.pageNum, type: that.type}) }); 
    
  },
  

  
  renderCollection: function () {
    this.collection.each(this.addModel.bind(this));
  },
  
  addModel: function (model) {
    var row = new SOC.Views.IndexRow({
      model: model,
      typeOfIndex: this.typeOfIndex,
      modelType: this.modelType,
      rowColor: this.rowColor
    });
    this.addSubview("#models", row);
    this.rowColor = -this.rowColor
  },
  
  generatePageChange: function(){
    var pageNum = parseInt(this.pageNum);
    var $pager = $('<div />', {"class": 'pager'})
    if(pageNum > 1){
      var previous = pageNum - 1
      $pager.append('<a href=#' + previous + " data-pageNum=" + previous + '>' + '<span class="page-numbers moving"' + " data-pageNum=" + previous +  '> previous</span>' + '</a>');
    }
    $pager.append('<span class="page-numbers current">' + pageNum + '</span>')
    if(this.collection.length >= 15){
      var next = pageNum + 1
      $pager.append('<a href=#' + next + " data-pageNum=" + next + '>' +'<span class="page-numbers moving"'  + " data-pageNum=" + next +  '> next</span>' + '</a>');
    }
    return $pager
  },
  
  renderSearchBoxView: function(event){
    if(this.modelType==="question"){
      this.$(".search-box").empty();
    
      var that = this;
      var showSearchBox = new SOC.Views.SearchBoxView({
        superView: this,
        objectType: "question",
        collection: this.collection
      });
      this.addSubview(".search-box", showSearchBox)
    }   
  }
  
});