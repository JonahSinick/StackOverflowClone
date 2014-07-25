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
#

class Comment < ActiveRecord::Base
  
  validates :body, :author_id, :author_name, :commentable_id, :commentable_type, presence: true

  belongs_to :commentable, polymorphic: true

  has_many :votes, as: :votable

end
