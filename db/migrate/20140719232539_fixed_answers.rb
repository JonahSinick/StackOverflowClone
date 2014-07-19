class FixedAnswers < ActiveRecord::Migration
  def change
    change_column :answers, :body, :text, :null => false
    change_column :answers, :author_id, :integer, :null => false
    change_column :answers, :question_id, :integer, :null => false
  end
end
