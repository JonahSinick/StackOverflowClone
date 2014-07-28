# == Schema Information
#
# Table name: comments
#
#  id               :integer          not null, primary key
#  body             :text             not null
#  author_id        :integer          not null
#  author_name      :string(255)      not null
#  commentable_id   :integer          not null
#  commentable_type :string(255)      not null
#  created_at       :datetime
#  updated_at       :datetime
#  score            :integer
#

class Comment < ActiveRecord::Base
  
  include VotesHelper  
  
  attr_accessor :current_user_vote
  attr_accessor :current_user_vote_get


  after_initialize :default_values
  
  validates :body, :author_id, :author_name, :commentable_id, :commentable_type, presence: true

  belongs_to :commentable, polymorphic: true
  
  belongs_to :author,
  class_name: "User",
  primary_key: :id,
  foreign_key: :author_id

  has_many :votes, as: :votable, dependent: :destroy
  after_initialize :default_values



  def score
    self.votes.length
  end


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
