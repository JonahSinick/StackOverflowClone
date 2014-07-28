json.extract! @user, :id, :username, :description, :karma


json.questions @user.questions do |question|
  json.extract! question, :id,
    :title,
    :created_at,
    :updated_at
    :current_user_vote_id
end 

json.answers @user.answers do |answer|
  json.extract! answer, :id,
    :question_id,
    :created_at,
    :updated_at
end 


json.comments @user.comments do |comment|
  json.extract! comment, :id,
    :commentable_id,
    :commentable_type,
    :body,
    :author_name,
    :author_id,
    :created_at,
    :updated_at
end




json.votes @user.votes do |vote|
  json.extract! vote, :id,
    :votable_id,
    :votable_type,
    :value
end 
