content = File.read("lorum_ipsum.txt")
array_content = content.split("\n")

# (1..25).each do |i|
#   t = Tag.new
#   s = array_content.sample
#   unless s == ""
#     t.name = s.split(" ")[0]
#     t.description = s
#     t.save
#   end
# end
#
#

# User.all.each do |user|
#   (0..4).each do |i|
#     t = Tag.all.sample
#     unless FavoriteTag.find_by(user_id: user.id, tag_id: t.id)
#       f = FavoriteTag.new(user_id: user.id, tag_id: t.id)
#       f.save
#     end
#   end
# end

Question.all.each do |question|
  (0..4).each do |i|
    t = Tag.all.sample
    unless QuestionTag.find_by(question_id: question.id, tag_id: t.id)
      qt = QuestionTag.new(question_id: question.id, tag_id: t.id)
      qt.save
    end
  end
end