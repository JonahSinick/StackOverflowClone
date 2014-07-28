class AddVoteCounts < ActiveRecord::Migration
  def change
    add_column :questions, :score, :integer
    add_column :answers, :score, :integer
    add_column :comments, :score, :integer
    add_column :users, :karma, :integer
  end
end
