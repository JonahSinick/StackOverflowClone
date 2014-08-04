# == Schema Information
#
# Table name: tags
#
#  id                  :integer          not null, primary key
#  name                :string(255)      not null
#  description         :text
#  created_at          :datetime
#  updated_at          :datetime
#  number_of_questions :integer
#  number_of_users     :integer
#

class Tag < ActiveRecord::Base

  
  validates :name, presence: true, uniqueness: true
  has_many :users, through: :favorite_tags
  has_many :questions, through: :question_tags

  def default_values
    self.number_of_questions ||= 0
    self.number_of_users ||= 0
  end


end
