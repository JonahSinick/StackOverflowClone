content = File.read("cupcake_ipsum.txt")
array_content = content.split("\n")


User.pluck(:id).each do |u|
  (1..25).each do |i|
    q = Question.all.sample
    a = Answer.all.sample
    c = Comment.all.sample
    v1 = Vote.find_by(user_id: u, votable_type: "Question", votable_id: q.id)
    v2 = Vote.find_by(user_id: u, votable_type: "Answer", votable_id: q.id)
    v3 = Vote.find_by(user_id: u, votable_type: "Comment", votable_id: q.id)
    unless v1
      if [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].sample > 6
        value = -1
      else
        value = 1
      end
      v1_new = Vote.new(user_id: u, votable_type: "Question", votable_id: q.id, value: value)
      v1_new.save
      new_score = q.score + value
      q.update_attributes(score: new_score)
      author = User.find(q.author_id)
      new_karma = author.karma + value * 10
      
      author.update_attributes(karma: new_karma)
    end
    unless v2
      if [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].sample > 6
        value = -1
      else
        value = 1
      end
      v2_new = Vote.new(user_id: u, votable_type: "Answer", votable_id: a.id, value: value)
      v2_new.save
      new_score = a.score + value
      a.update_attributes(score: new_score)
      author = User.find(a.author_id)
      new_karma = author.karma + value * 10
      
      author.update_attributes(karma: new_karma)
    end
    unless v3
      if [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].sample > 6
        value = -1
      else
        value = 1
      end
      v2_new = Vote.new(user_id: u, votable_type: "Comment", votable_id: c.id, value: value)
      v2_new.save
      new_score = c.score + value
      c.update_attributes(score: new_score)
      author = User.find(c.author_id)
      new_karma = author.karma + value * 10
      author.update_attributes(karma: new_karma)
    end
  end
end

