class AddAuthorToAnswers < ActiveRecord::Migration
  def change
    add_column :answers, :author_name, :string, null: false
    add_column :questions, :author_name, :string, null: false
  end
end
