SOC.Views.TagsIndex = Backbone.CompositeView.extend({
  template: JST['tags/index'],

  initialize: function (options) {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    this.renderTags();
    this.renderSearchBoxView();
    return this;
  },
  
  renderTags: function () {
    this.collection.each(this.addTag.bind(this));
  },
  
  addTag: function (tag) {
    var view = new SOC.Views.TagCell({
      model: tag
    });
    this.addSubview(".tags", view);
  },


  renderSearchBoxView: function(event){
    this.$(".search-box").empty();
  
    var that = this;
    var showSearchBox = new SOC.Views.TagSearch({
      superView: this 
    });
    this.addSubview(".search-box", showSearchBox)
  }

  
});


// SOC.Views.SearchBoxView = Backbone.CompositeView.extend({
//
//   template: $('<div><input class="typeahead" type="text"  style="width: 300px;"></input>'),
//
//   initialize: function(options){
//     this.superView = options.superView;
//     this.listenTo(SOC.questionTitles, 'sync', this.render);
//   },
//
//   render: function () {
//     var content = this.template;
//     this.$el.html(content);
//     if(SOC.questionTitles.length > 0){
//       this.searchBoxFiller();
//     }
//     return this;
//   },
//
//
//   substringMatcher: function(strs){
//     return function findMatches(q, cb) {
//       var matches, substrRegex;
//
//       // an array that will be populated with substring matches
//       matches = [];
//
//       // regex used to determine if a string contains the substring `q`
//       substrRegex = new RegExp(q, 'i');
//
//       // iterate through the pool of strings and for any string that
//       // contains the substring `q`, add it to the `matches` array
//       $.each(strs, function(i, str) {
//         if (substrRegex.test(str)) {
//           // the typeahead jQuery plugin expects suggestions to a
//           // JavaScript object, refer to typeahead docs for more info
//           matches.push({ value: str });
//         }
//       });
//
//       cb(matches.slice(0, 10));
//     };
//
//   },
//
//
//   questionTitles: function(){
//     if(SOC.questionTitles.length > 0){
//       var questionTitles = []
//       SOC.questionTitles.models.forEach(function(qt){
//         questionTitles.push(qt.escape("title"))
//       });
//     }
//     return questionTitles;
//   },
//
//   searchBoxFiller: function(){
//
//     var that = this;
//     this.$('.typeahead').typeahead({
//       hint: false,
//       highlight: true,
//       minLength: 1
//     },
//     {
//       name: 'states',
//       displayKey: 'value',
//       source: that.substringMatcher(that.questionTitles())
//     });
//   },
//
//   events: {
//     'keydown': 'keyAction',
//     'click' : 'preventDefault'
//   },
//
//
//   keyAction: function(e){
//     if(1===1){
//       var code = e.keyCode || e.which;
//       if(code == 13) {
//         e.preventDefault();
//         this.submit();
//       }
//     }
//   },
//
//   submit: function(){
//     var that = this;
//     var question = SOC.questionTitles.find(function(model) { return model.get('title') === that.$(".tt-input").val() });
//     if(question){
//       that.$(".tt-input").val("")
//       Backbone.history.navigate("questions/" + question.id, {trigger:true});
//     } else{
//       that.superView.collection.reset()
//       that.superView.collection.fetch({ data: $.param({ search: that.$(".tt-input").val()}) });
//     }
//     this.superView.collection.trigger("resetSearchBox")
//   }
//
//
//
// });
