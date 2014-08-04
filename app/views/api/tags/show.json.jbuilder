
json.extract! @tag, :id, :name, :description


json.questions @tag.questions do |question|
  json.extract! question, :id, :title, :body, :author_name, :author_id, :created_at, :updated_at, :score, :answer_count
end


json.users @tag.users do |user|
  json.extract! user, :id, :username, :description, :karma, :email
end

