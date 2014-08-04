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
    this.rowColor = -1;
  },
  
  events: {
    'click .page-numbers.moving' : 'pageSwitch'
  },
  
  render: function () {
      var content = this.template({
        collection: this.collection,
        modelType: this.modelType,
        typeOfIndex: this.typeOfIndex
      });
      this.$el.html(content);
      this.renderCollection();
      this.renderPager();
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
  },
  
  renderPager: function(){
    var $pager = this.generatePageChange()
    this.$('.pager').html($pager)    
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
  }
});
