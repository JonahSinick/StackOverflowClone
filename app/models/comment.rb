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
  

  after_initialize :default_values
  
  validates :body, :author_id, :author_name, :commentable_id, :commentable_type, presence: true

  belongs_to :commentable, polymorphic: true
  
  belongs_to :author,
  class_name: "User",
  primary_key: :id,
  foreign_key: :author_id

  has_many :votes, as: :votable, dependent: :destroy
  after_initialize :default_values

  private
  
  
  def default_values
      self.score ||= 0
  end
end
