SOC.Views.IndexRow = Backbone.CompositeView.extend({
  template: JST['helpers/index-row'],
  
  initialize: function(options) {
    this.model = options.model;
    this.modelType = options.modelType;
    this.rowColor = options.rowColor;
    if(this.rowColor === 1){
      this.$el = $('<div class="row" style="padding-top:10px; padding-bottom:10px; background-color: #9DBDFF;"></div>');
    } else{
      this.$el = $('<div class="row" style="padding-top:10px; padding-bottom:10px; background-color: #B2CBFF;" ></div>');
    }
  },
  render: function () {
    var content = this.template({
      model: this.model,
      modelType: this.modelType,
    })
    this.$el.html(content);
    if(this.modelType==="user"){
      this.renderGravatar();
    }
    return this;
  },

  renderGravatar: function(){
    var email = this.model.escape("email");
    var gravatar = $('<img>').attr({src: 'http://www.gravatar.com/avatar/' + md5(email)});
    $('.gravatar').append(gravatar);    
  }
  
});
