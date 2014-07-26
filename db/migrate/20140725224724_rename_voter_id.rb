class RenameVoterId < ActiveRecord::Migration
  def change
    remove_column :votes, :voter_id
    add_column :votes, :user_id, :integer
  end
end
