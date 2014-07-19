class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.text :body
      t.integer :author_id
      t.integer :question_id
      t.timestamps
    end
    add_index :answers, :author_id
    add_index :answers, :question_id
    add_index :answers, [:author_id, :question_id], unique: true
  end
end
