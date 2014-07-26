content = File.read("cupcake_ipsum.txt")
array_content = content.split("\n")

User.all.each do |u|
  num_answers = (0..5).to_a.sample
  (1..num_answers).each do |i|
    q = Question.all.sample
    answer = Answer.find_by_author_id_and_question_id(u.id, q.id)
    if !answer
      a = Answer.new
      a.question_id = q.id
      a.author_id = u.id
      a.author_name = u.username
      a.body = array_content.sample
      a.save
    end
  end
end

