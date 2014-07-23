

json.extract! @question, :id, :title, :body, :created_at, :updated_at

json.answers @question.answers do |answer|
  json.extract! answer, :id, :body, :author_id, :question_id, :created_at,       :updated_at
end