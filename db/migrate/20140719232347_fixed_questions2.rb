class FixedQuestions2 < ActiveRecord::Migration
  def change

    change_column :questions, :title, :string, :null => false
    change_column :questions, :body, :text, :null => false
    
  end
  add_index :questions, :author_id, unique: true
end
