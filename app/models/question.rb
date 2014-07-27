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
#

class Question < ActiveRecord::Base

  attr_accessor :user_vote_id


  validates :title, :body, :author_id, presence: true
  
  
    def initialize
      @user_vote_id
    end
  
  
  belongs_to :author,
  class_name: "User",
  primary_key: :id,
  foreign_key: :author_id


  has_many :answers,
  class_name: "Answer",
  primary_key: :id,
  foreign_key: :question_id,
  dependent: :destroy 

  has_many :comments, as: :commentable, dependent: :destroy
  has_many :votes, as: :votable, dependent: :destroy

end
