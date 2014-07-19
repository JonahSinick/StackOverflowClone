class Answer < ActiveRecord::Base
  
  belongs_to :author,
  class: "User",
  primary_key: :id,
  foreign_key: :author_id
  
  belongs_to :question,
  class: "Question",
  primary_key: :id,
  foreign_key: :question_id
  
  

end
