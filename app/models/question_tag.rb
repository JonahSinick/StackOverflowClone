# == Schema Information
#
# Table name: question_tags
#
#  id          :integer          not null, primary key
#  question_id :integer          not null
#  tag_id      :integer          not null
#  created_at  :datetime
#  updated_at  :datetime
#

class QuestionTag < ActiveRecord::Base
  
  belongs_to :tag
  belongs_to :question
  
  
end
