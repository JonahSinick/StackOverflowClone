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
#

class User < ActiveRecord::Base
  
  validates :username, :email, :password_digest, :session_token, presence: true
  validates :username, :email, uniqueness: true
  
  has_many :authored_questions,
  class: "Question",
  primary_key: :id,
  foreign_key: :author_id
  
  has_many :authored_answers,
  class: "Answer",
  primary_key: :id,
  foreign_key: :author_id
  
    
  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

    
  
end
