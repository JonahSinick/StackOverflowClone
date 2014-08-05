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
    this.listenTo(SOC.questionTitles, 'sync', this.renderSearchBoxView);
    
    this.listenTo(this.collection, 'sync', this.renderPager);
    this.rowColor = 1;
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
  },
  
  renderSearchBoxView: function(){
    this.$(".search-box").empty();
    
    var that = this;
    var showSearchBox = new SOC.Views.SearchBoxView({
      superView: this 
    });
    this.addSubview(".search-box", showSearchBox)
  } 
  
  
});




SOC.Views.SearchBoxView = Backbone.CompositeView.extend({
  
  template: $('<div><input class="typeahead" type="text"  style="width: 300px;"></input>'),
  initialize: function(){
    this.listenTo(SOC.questionTitles, 'sync', this.searchBoxFiller);
  },
  
  render: function () {
    var content = this.template;
    this.$el.html(content);
    return this;
  },
  
  
  substringMatcher: function(strs){
    return function findMatches(q, cb) {
      var matches, substrRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          // the typeahead jQuery plugin expects suggestions to a
          // JavaScript object, refer to typeahead docs for more info
          matches.push({ value: str });
        }
      });

      cb(matches);
    };
    
  },  
  
  
  questionTitles: function(){
    if(SOC.questionTitles.length > 0){
      var questionTitles = []
      SOC.questionTitles.models.forEach(function(qt){
        questionTitles.push(qt.escape("title"))
      });
    }
    return questionTitles;
  },
  
  searchBoxFiller: function(){
    this.render();

    var that = this;
    this.$('.typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'states',
      displayKey: 'value',
      source: that.substringMatcher(that.questionTitles())
    });
  },
  
  events: {
    'keydown': 'keyAction'
  }
  
  

});
