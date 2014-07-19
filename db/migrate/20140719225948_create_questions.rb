class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :user_id
      t.string :title
      t.text :body
      t.timestamps
    end
    add_index :questions, :user_id
    add_index :questions, :title, unique: true
  end
end
