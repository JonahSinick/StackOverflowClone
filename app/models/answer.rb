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
#  score       :integer
#

class Answer < ActiveRecord::Base
  
  include VotesHelper
  attr_accessor :current_user_vote
  attr_accessor :current_user_vote_get


  after_initialize :default_values

  validates :author_id, uniqueness: {scope: :question_id, message: "User can only post one answer per question."}

  
  belongs_to :user,
  class_name: "User",
  primary_key: :id,
  foreign_key: :author_id
  
  belongs_to :question,
  class_name: "Question",
  primary_key: :id,
  foreign_key: :question_id
  
  has_many :comments, as: :commentable, dependent: :destroy

  has_many :votes, as: :votable, dependent: :destroy



  def current_user_vote_get(user)
    current_user_vote = Vote.where({votable_id: self.id, user_id: user.id})[0]
    if current_user_vote
      self.current_user_vote = current_user_vote
    end
  end


  private
  
    def default_values
      self.score ||= 0
      @current_user_vote = nil
    end
end
