tags = ['Raskolnikov', 'Razumihin', 'Katerina', 'Dounia', 'Nastasya',  'Petrovitch', 'Zossimov', 'heart', 'axe', 'woman', 'man', 'roubles', 'mother', 'axe', 'life', 'Rodya', 'brother', 'Marmeladov', 'Nikodim', 'landlady', 'Sonia', 'strength', 'God', 'Luzhin', 'Lizaveta', 'drink', 'love', 'daughter', 'Nikolay']

tags.each do |tag|
  t = Tag.new(name: tag)
  t.save
end


Question.all.each do |question|
  qts = []
  Tag.all.each do |tag|
    tagged = false
    if question.body.include?(tag.name)
      tagged = true
    end
    question.answers.each do |answer|
      if answer.body.include?(tag.name)
        tagged = true
        answer.comments.each do |comment|
          if comment.body.include?(tag.name)
            tagged = true
          end
        end
      end
    end
    question.comments.each do |comment|
      if comment.body.include?(tag.name)
        tagged = true
      end
    end
    if tagged
      qt = QuestionTag.new(question_id: question.id, tag_id: tag.id)
      qts << qt
    end
  end
  qts[0..4].each do |qt|
    qt.save
  end
end