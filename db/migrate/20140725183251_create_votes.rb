class CreateVotes < ActiveRecord::Migration
  def change    
    create_table :votes do |t|
      t.string :title
      t.integer :voter_id
      t.integer :sign
      t.integer :votable_id
      t.integer :votable_type
      t.timestamps
    end
    add_index :votes, [:voter_id, :votable_type, :votable_id], unique: true
  end
end


#  id           :integer          not null, primary key
#  voter_id     :integer          not null
#  sign         :integer          not null
#  votable_id   :integer          not null
#  votable_type :string(255)      not null
#  created_at   :datetime
#  updated_at   :datetime
