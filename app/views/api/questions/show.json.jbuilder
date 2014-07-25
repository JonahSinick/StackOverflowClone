

json.extract! @question, :id, :title, :body, :author_name, :author_id

json.answers @question.answers do |answer|
  json.extract! answer, :id, :body, :author_id, :question_id, :author_name, :created_at, :updated_at

  # json.comments answer.comments do |comment|
  #   json.extract! comment, :id,
  #     :commentable_id,
  #     :commentable_type,
  #     :body,
  #     :author_name,
  #     :author_id,
  #     :created_at,
  #     :updated_at
  # end
  #
end


