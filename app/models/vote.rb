# == Schema Information
#
# Table name: votes
#
#  id           :integer          not null, primary key
#  voter_id     :integer          not null
#  votable_id   :integer          not null
#  votable_type :string(255)      not null
#  created_at   :datetime
#  updated_at   :datetime
#  value        :integer          not null
#

class Vote < ActiveRecord::Base
  
  validates :voter_id, uniqueness: {scope: :votable_id, message: "Can cast only one vote!" }
  
  validates :voter_id, :value, :votable_id, :votable_type, presence: true

  belongs_to :votable, polymorphic: true  
  
  belongs_to :voter,
  class_name: "User",
  primary_key: :id,
  foreign_key: :voter_id
  
  

  
end
