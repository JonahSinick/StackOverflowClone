# == Schema Information
#
# Table name: votes
#
#  id           :integer          not null, primary key
#  votable_id   :integer          not null
#  votable_type :string(255)      not null
#  created_at   :datetime
#  updated_at   :datetime
#  value        :integer          not null
#  user_id      :integer
#

class Vote < ActiveRecord::Base
  
  validates :user_id, uniqueness: {scope: [:votable_id, :votable_type], message: "Can cast only one vote!" }
  
  validates :user_id, :value, :votable_id, :votable_type, presence: true

  belongs_to :votable, polymorphic: true
  
  belongs_to :user

  
end
