json.extract! @question, :id, :title, :body, :created_at, :updated_at

json.answers @question.answers do |answer|
  json.extract! :id, :body, :author_id, :question_ id, :created_at, :updated_at
end


# == Schema Information
#
# Table name: answers
#
#  id          :integer          not null, primary key
#  body        :text             not null
#  author_id   :integer          not null
#  question_id :integer          not null
#  created_at  :datetime
#  updated_at  :datetime
#
