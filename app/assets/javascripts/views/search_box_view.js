SOC.Views.SearchBoxView = Backbone.CompositeView.extend({
  
  template: $('<div><input class="typeahead" type="text" placeholder="" style="width: 600px;"></input>'),
  
  initialize: function(options){
    var that = this;
    this.superView = options.superView;
    this.objectType = options.objectType;
    this.tagsLeft = options.tagsLeft;
    this.label = (that.objectType==="tag") ? "name" : "title";
  },
  
  render: function () {
    var that = this;
    this.$(".tt-input").val("");

    if(this.collection.length > 0){
      var content = this.template;
      this.template.attr("placeholder", that.tagsLeft)
      this.$el.html(content);
      this.searchBoxFiller();
      
    }
    return this;
  },
  
  setNameTitles: function(){
    var that = this;
    var nameTitles = [];
    this.collection.models.forEach(function(model){
      nameTitles.push(model.get(that.label))
    });
    return nameTitles;
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

      cb(matches.slice(0, 10));
    };
  },  
    
  searchBoxFiller: function(){
    var that = this;
    this.$('.typeahead').typeahead({
      hint: false,
      highlight: true,
      minLength: 1
    },
    {
      name: 'states',
      displayKey: 'value',
      source: that.substringMatcher(that.setNameTitles())
    });
  },
  
  events: {
    'keydown': 'keyAction',
    'click' : 'preventDefault'    
  },
  
  
  keyAction: function(e){
    if(true){
      var code = e.keyCode || e.which;
      if(code == 13) { 
        e.preventDefault();
        this.submit();
      }
    }
  },
  
  submit: function(event){
    var that = this;
    var object = this.collection.find(function(model) { return model.get(that.label) === that.$(".tt-input").val() });
    if(that.objectType==="question"){
      that.$(".tt-input").val("")      
      if(object){
        that.$(".tt-input").val("")
        Backbone.history.navigate(that.objectType + "s/" + object.id, {trigger:true});
      } else{
        debugger
        that.superView.collection.fetch({ 
          data: $.param({
            search: that.$(".tt-input").val()
          }) 
        });
        debugger
      }      
    }

    if(that.objectType==="tag"){
      if(this.superView.ownCollection.length>= 5){
        this.superView.tagErrors = "A question can have no more than 5 tags."
        this.superView.collection.trigger("resetSearchBox");

        this.superView.render();
        return false;
      }
      if(that.$(".tt-input").val() === ""){
        return false;
      }
      if(object){
        that.superView.ownCollection.add(object)
      } else{
        this.superView.tagErrors = "That's not one of the listed tags."
        this.superView.collection.trigger("resetSearchBox");

        this.superView.render();
        return false;
      }
      that.$(".tt-input").val("")
      that.superView.ownCollection.add(object)
      that.superView.collection.trigger("resetSearchBox");
      that.superView.tagErrors = null
      that.superView.render();      
    }

  }
});
