# == Schema Information
#
# Table name: questions
#
#  id             :integer          not null, primary key
#  title          :string(255)      not null
#  body           :text             not null
#  created_at     :datetime
#  updated_at     :datetime
#  author_id      :integer          not null
#  author_name    :string(255)      not null
#  score          :integer
#  answer_count   :integer
#  number_of_tags :integer
#

class Question < ActiveRecord::Base
  

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
  
  has_many :question_tags

  has_many :comments, as: :commentable, dependent: :destroy
  has_many :votes, as: :votable, dependent: :destroy
  has_many :tags, through: :question_tags

  
  private
  
  def default_values
    self.score ||= 0
    self.answer_count ||= 0
  end
end
