SOC.Views.IndexRow = Backbone.CompositeView.extend({
  template: JST['helpers/index-row'],
  
  initialize: function(options) {
    this.model = options.model;
    this.modelType = options.modelType;
    this.rowColor = options.rowColor;
    if(this.rowColor === 1){
      this.row = '<div class="row" style="padding-top:10px; padding-bottom:10px; background-color: LightBlue;">'
    } else{
      this.row = '<div class="row" style="padding-top:10px; padding-bottom:10px; background-color: white;">'
    }
  },
  render: function () {
    var content = this.template({
      model: this.model,
      modelType: this.modelType,
      row: this.row

    })
    this.$el.html(content);
    if(this.modelType==="user"){
      this.renderGravatar;
    }
    return this;
  },

  renderGravatar: function(){
    var email = this.model.escape("email");
    var gravatar = $('<img>').attr({src: 'http://www.gravatar.com/avatar/' + md5(email)});
    $('.gravatar').append(gravatar);    
  }
  
});
