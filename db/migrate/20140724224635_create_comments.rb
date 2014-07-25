# class CreateComments < ActiveRecord::Migration
#   def change
#     drop_table :comments
#
#     create_table :comments do |t|
#       t.text :body, null: false
#       t.integer :author_id, null: false
#       t.string :author_name, null: false
#       t.integer :commentable_id, null: false
#       t.string :commentable_type, null: false
#       t.timestamps
#     end
#     add_index :comments, :author_id
#   end
# end
