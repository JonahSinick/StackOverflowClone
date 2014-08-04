class IndexesForNewTagColumns < ActiveRecord::Migration
  def change
  end
  add_index :tags, :number_of_questions
  add_index :tags, :number_of_users
end
