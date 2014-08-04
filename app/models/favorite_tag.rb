# == Schema Information
#
# Table name: favorite_tags
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  tag_id     :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class FavoriteTag < ActiveRecord::Base
  
  belongs_to :tag
  belongs_to :user
  
  
end
