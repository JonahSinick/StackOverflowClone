class AddAnswerCountToQuestion < ActiveRecord::Migration
  def change
    add_column :questions, :answer_count, :integer
  end
end
