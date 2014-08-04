class Favoritetag < ActiveRecord::Migration
  def change
    create_table :favorite_tags do |t|
      t.integer :user_id, null: false
      t.integer :tag_id, null: false
      t.timestamps
    end
    add_index :favorite_tags, [:user_id, :tag_id], unique: true
  end
end
