# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)      not null
#  email           :string(255)      not null
#  password_digest :string(255)      not null
#  session_token   :string(255)      not null
#  created_at      :datetime
#  updated_at      :datetime
#  description     :text
#  karma           :integer
#

class User < ActiveRecord::Base

  include VotesHelper
  
  attr_accessor :karma
  
  validates :username, :email, :password_digest, :session_token, presence: true
  validates :username, :email, uniqueness: true
  
  has_many :questions,
  class_name: "Question",
  primary_key: :id,
  foreign_key: :author_id
  
  has_many :answers,
  class_name: "Answer",
  primary_key: :id,
  foreign_key: :author_id

  has_many :comments,
  class_name: "Comment",
  primary_key: :id,
  foreign_key: :author_id

  has_many :votes
  
  after_initialize :default_values
  
    
  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
  
  
  def karma
    karma = 0
    self.questions.each do |question|
      karma += 10 * question.score
    end
    
    self.answers.each do |answer|
      karma += 10 * answer.score
    end

    self.comments.each do |comment|
      karma += 10 * comment.score
    end
    self.karma = karma
  end

  private
  
    def default_values
      self.karma ||= 0  
    end    
end
    
  