
json.extract! @question, :id, :title, :body, :author_name, :author_id, :created_at, :updated_at, :score



json.answers @question.answers do |answer|
  json.extract! answer, :id, :body, :author_id, :question_id, :author_name, :created_at, :updated_at, :score

  json.comments answer.comments do |comment|
    json.extract! comment, :id,
      :commentable_id,
      :commentable_type,
      :body,
      :author_name,
      :author_id,
      :created_at,
      :updated_at,
      :score
  end

end


json.comments @question.comments do |comment|
  json.extract! comment, :id,
    :commentable_id,
    :commentable_type,
    :body,
    :author_name,
    :author_id,
    :created_at,
    :updated_at,
    :score
end





json.votes @question.votes do |vote|
  json.extract! vote, :id, :user_id, :votable_id, :votable_type, :value

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