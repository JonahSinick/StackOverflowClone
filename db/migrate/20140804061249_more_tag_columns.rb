class MoreTagColumns < ActiveRecord::Migration
  def change
    add_column :tags, :number_of_questions, :integer
    add_column :tags, :number_of_users, :integer
    add_column :questions, :number_of_tags, :integer
  end
end
