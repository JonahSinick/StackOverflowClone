SOC.Views.AnswerNewShowEdit = SOC.Views.NewShowEdit.extend({

  initialize: function(options){
    this.class = "Answer"
  },
  
  params: function(){
    var params = {
      body: this.$(".textToCreateUpdate").val(),
      author_id: SOC.currentUser.id,
      author_name: SOC.currentUser.escape("username"),
      question_id: this.model.id
    };
    return params;
  }
    
});

