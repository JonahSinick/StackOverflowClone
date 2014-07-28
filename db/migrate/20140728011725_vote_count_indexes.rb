class VoteCountIndexes < ActiveRecord::Migration
  def change
  end
  add_index :questions, :score
  add_index :answers, :score
  add_index :users, :karma
end
