SOC.Views.CommentNewShowEdit = SOC.Views.NewShowEdit.extend({

  initialize: function(options){
    this.class = "Comment"
  },

  
  

  params: function(){
    var params = {
      body: this.$(".textToCreateUpdate").val(),
      commentable_type: this.model.escape("commentable_type"),
      commentable_id: this.model.escape("commentable_id"),
      author_id: SOC.currentUser.id,
      author_name: SOC.currentUser.escape("username")
    };
    return params;
  },
  
});

