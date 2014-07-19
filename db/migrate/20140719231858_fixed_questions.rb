class FixedQuestions < ActiveRecord::Migration
  def change
    remove_column :questions, :user_id
    add_column :questions, :author_id, :integer, null: false
  end
end
