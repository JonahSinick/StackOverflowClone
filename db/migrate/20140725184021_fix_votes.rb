class FixVotes < ActiveRecord::Migration
  def change
    remove_column :votes, :sign
    add_column :votes, :value, :integer, null: false
  end
end
