class AddIndexToVotesAgain < ActiveRecord::Migration
  def change
  end
  add_index :votes, [:user_id, :votable_id, :votable_type], unique: true  
end
