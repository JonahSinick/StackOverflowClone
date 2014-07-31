content = File.read("cupcake_ipsum.txt")
array_content = content.split("\n")

# User.all.each do |u|
#   num_questions = (0..5).to_a.sample
#
#   (1..num_questions).each do |i|
#     q = Question.new
#     q.author_id = u.id
#     q.author_name = u.username
#     q.body = array_content.sample
#     potential_title_text = array_content.sample.split(" ")
#     q.title = potential_title_text[0] + " " + potential_title_text[1] + " " + potential_title_text[2] + " " + potential_title_text[3] + " " + potential_title_text.sample
#     q.save
#   end
# end



  