class FixVotes2 < ActiveRecord::Migration
  def change

    remove_column :votes, :title
    change_column :votes, :voter_id, :integer, :null => false
    change_column :votes, :votable_type, :string, :null => false
    change_column :votes, :votable_id, :integer, :null => false
    
  end
end
