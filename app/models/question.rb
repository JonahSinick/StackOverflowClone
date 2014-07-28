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
#  score       :integer
#




class Question < ActiveRecord::Base

  include VotesHelper

  attr_accessor :current_user_vote
  attr_accessor :current_user_vote_get
  

  after_initialize :default_values
  



  validates :title, :body, :author_id, presence: true
  
  
  
  
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
