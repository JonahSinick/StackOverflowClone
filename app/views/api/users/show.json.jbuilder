json.extract! @user, :id, :username, :description


json.questions @user.questions do |question|
  json.extract! question, :id,
    :title,
    :question_id,
    :created_at,
    :updated_at
end 

json.answers @user.answers do |answer|
  json.extract! answer, :id,
    :question_id,
    :created_at,
    :updated_at
end 



json.votes @user.votes do |vote|
  json.extract! vote, :id,
    :votable_id,
    :votable_type
end 
