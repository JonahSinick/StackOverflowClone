class ChangeGuestColumnName < ActiveRecord::Migration
  def change
    remove_column :users, :guest
    add_column :users, :guest_id, :integer
  end
end
