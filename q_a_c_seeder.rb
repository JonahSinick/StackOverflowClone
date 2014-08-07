array_content = []
array_content << File.read("crime_and_punishment.txt").split("\n\n")

users = User.all

def increment_outer (arr, idx)
  if arr[idx].length == 0
    idx += 1
  end
end
  

big_array_idx = 0
users.each do |u|
  num_questions = (1..5).to_a.sample
  (1..num_questions).each do |i|
    increment_outer(array_content, big_array_idx)
    q = Question.new
    q.author_id = u.id
    q.author_name = u.username
    q.body = array_content[big_array_idx].shift
    if q.body.length <=60
      q.title = q.body
    else
      q.title = q.body[0..59].scan(/^.*\s/)[0][0...-1] + " ..."
    end
    if Question.where(title: q.title).length == 0
      if q.save
        num_question_comments = (0..2).to_a.sample
        (1..num_question_comments).each do |q_c_indx|
          c = Comment.new
          increment_outer(array_content, big_array_idx)
          c.commentable_type = "Question"
          c.commentable_id = q.id  
          new_author = users.sample  
          c.author_id = new_author.id
          c.author_name = new_author.username
          content = array_content[big_array_idx].shift  
          if content.length <=450
            c.body = content
          else
            c.body = content[0...450].scan(/^.*\s/)[0][0...-1] + " ..."
          end
          c.save
        end
        num_answers = (0...3).to_a.sample      
        (1..num_answers).each do |ans_ind|
          answer = Answer.find_by_author_id_and_question_id(u.id, q.id)
          if !answer
            answer = Answer.new
            increment_outer(array_content, big_array_idx)
            answer.question_id = q.id
            new_author = users.sample  
            answer.author_id = new_author.id
            answer.author_name = new_author.username            
            answer.body = array_content[big_array_idx].shift
            q.answer_count += 1
            q.save
            answer.save
          end
          num_answers_comments = (0...2).to_a.sample      
          (1..num_answers_comments).each do |a_c_indx|
            increment_outer(array_content, big_array_idx)          
            c = Comment.new
            c.commentable_type = "Answer"
            c.commentable_id = answer.id    
            new_author = users.sample  
            c.author_id = new_author.id
            c.author_name = new_author.username
            content = array_content[big_array_idx].shift  
            if content.length <=450
              c.body = content
            else
              c.body = content[0...450].scan(/^.*\s/)[0][0...-1] + " ..."
            end
            c.save
          end
        end
      end
    end
  end
end
      

  
# User.all.each do |u|
#   num_questions = (0..5).to_a.sample
#
#   (1..num_questions).each do |i|
#     q = Question.new
#     q.author_id = u.id
#     q.author_name = u.username
#     q.body = array_content.sample
#     potential_title_text = array_content.sample.  (" ")
#     q.title = potential_title_text[0] + " " + potential_title_text[1] + " " + potential_title_text[2] + " " + potential_title_text[3] + " " + potential_title_text.sample
#     q.save
#   end
# end


