json.extract! @user, :id, :username


:id, :title, :body, :created_at, :updated_at,:author_name
json.questions @user.questions do |question|
  json.extract! answer, :id,
    :title,
    :body,
    :author_name
    :question_id,
    :author_name,
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

json.answers @user.answers do |answer|
  json.extract! answer, :id,
    :body,
    :author_id,
    :question_id,
    :author_name,
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



json.questions @user.questions do |question|




  json.questions.extract!  :id, :title, :body, :created_at, :updated_at,:author_name
  json.questions.extract!  :id, :title, :body, :created_at, :updated_at,:author_name
  json.answers question do |answer|
    json.extract! answer, :id, 
    :body, 
    :author_id, 
    :question_id, 
    :author_name, 
    :created_at, 
    :updated_at

    json.comments answer.comments do |comment|
      json.extract! comment, :id,
        :commentable_id,
        :commentable_type,
        :body,
        :author_name,
        :author_id,
        :created_at,
        :updated_at
    end 

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


