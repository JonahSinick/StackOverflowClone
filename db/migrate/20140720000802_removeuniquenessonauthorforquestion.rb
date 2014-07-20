class Removeuniquenessonauthorforquestion < ActiveRecord::Migration
  def change
    remove_index :questions, :author_id
    add_index :questions, :author_id
    
  end
end
