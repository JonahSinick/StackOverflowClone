# == Schema Information
#
# Table name: votes
#
#  id           :integer          not null, primary key
#  voter_id     :integer          not null
#  sign         :integer          not null
#  votable_id   :integer          not null
#  votable_type :string(255)      not null
#  created_at   :datetime
#  updated_at   :datetime
#

class Vote < ActiveRecord::Base
  
  # validates :voter_id, :uniquness, :scope => [:votable_id, :votable_type]
  validates :voter_id, :sign, :votable_id, :votable_type, unique: true

  belongs_to :votable, polymorphic: true  
  
  belongs_to :voter,
  class_name: "User",
  primary_key: :id,
  foreign_key: :voter_id
  
  

  
end
