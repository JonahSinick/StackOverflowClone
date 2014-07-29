class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :name, null: false
      t.text :description
      t.timestamps
    end
    add_index :tags, :name, unique: true
  end
end
