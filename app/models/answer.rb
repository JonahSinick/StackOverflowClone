# == Schema Information
#
# Table name: answers
#
#  id          :integer          not null, primary key
#  body        :text             not null
#  author_id   :integer          not null
#  question_id :integer          not null
#  created_at  :datetime
#  updated_at  :datetime
#  author_name :string(255)      not null
#  vote_total  :integer          default(0)
#

class Answer < ActiveRecord::Base
  


  validates :author_id, uniqueness: {scope: :question_id, message: "User can only post one answer per question."}

  
  belongs_to :author,
  class_name: "User",
  primary_key: :id,
  foreign_key: :author_id
  
  belongs_to :question,
  class_name: "Question",
  primary_key: :id,
  foreign_key: :question_id
  
  has_many :comments, as: :commentable  

  has_many :votes, as: :votable

end
