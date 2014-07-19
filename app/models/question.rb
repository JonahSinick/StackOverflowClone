class Question < ActiveRecord::Base
  
  belongs_to :author,
  class: "User",
  primary_key: :id,
  foreign_key: :author_id


  has_many :answers,
  class: "Answer",
  primary_key: :id,
  foreign_key: :question_id    
  
end
