# == Schema Information
#
# Table name: questions
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  body        :text             not null
#  created_at  :datetime
#  updated_at  :datetime
#  author_id   :integer          not null
#  author_name :string(255)      not null
#  vote_total  :integer          default(0)
#

class Question < ActiveRecord::Base


validates :title, :body, :author_id, presence: true
  
  belongs_to :author,
  class_name: "User",
  primary_key: :id,
  foreign_key: :author_id


  has_many :answers,
  class_name: "Answer",
  primary_key: :id,
  foreign_key: :question_id    

  has_many :comments, as: :commentable
  has_many :votes, as: :votable
  
end
