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
#

class User < ActiveRecord::Base
  
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
  
    
  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

    
  
end
