SOC.Views.QuestionNewShowEdit = SOC.Views.NewShowEdit.extend({

  initialize: function(options){
    this.class = "Question"
  },
  
  params: function(){
    var params = {
      body: this.$(".textToCreateUpdate").val(),
      author_id: SOC.currentUser.id,
      author_name: SOC.currentUser.escape("username")
    };
    return params;
  }
    
});

