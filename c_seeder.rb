content = File.read("lorum_ipsum.txt")
array_content = content.split("\n")

User.all.each do |u|
  num_comments = (0..5).to_a.sample
  (1..num_comments).each do |i|
    c = Comment.new

      a = Answer.all.sample
      c.commentable_type = "Answer"
      c.commentable_id = a.id    
      c.author_id = u.id
      c.author_name = u.username
      s = array_content.sample
      unless s == ""
        c.body = s
        c.save
      end
  end
end

