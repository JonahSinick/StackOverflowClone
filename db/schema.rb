# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140804061725) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: true do |t|
    t.text     "body",        null: false
    t.integer  "author_id",   null: false
    t.integer  "question_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "author_name", null: false
    t.integer  "score"
  end

  add_index "answers", ["author_id", "question_id"], name: "index_answers_on_author_id_and_question_id", unique: true, using: :btree
  add_index "answers", ["author_id"], name: "index_answers_on_author_id", using: :btree
  add_index "answers", ["question_id"], name: "index_answers_on_question_id", using: :btree
  add_index "answers", ["score"], name: "index_answers_on_score", using: :btree

  create_table "comments", force: true do |t|
    t.text     "body",             null: false
    t.integer  "author_id",        null: false
    t.string   "author_name",      null: false
    t.integer  "commentable_id",   null: false
    t.string   "commentable_type", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "score"
  end

  add_index "comments", ["author_id"], name: "index_comments_on_author_id", using: :btree

  create_table "favorite_tags", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "tag_id",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "favorite_tags", ["user_id", "tag_id"], name: "index_favorite_tags_on_user_id_and_tag_id", unique: true, using: :btree

  create_table "question_tags", force: true do |t|
    t.integer  "question_id", null: false
    t.integer  "tag_id",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "question_tags", ["question_id", "tag_id"], name: "index_question_tags_on_question_id_and_tag_id", unique: true, using: :btree

  create_table "questions", force: true do |t|
    t.string   "title",          null: false
    t.text     "body",           null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "author_id",      null: false
    t.string   "author_name",    null: false
    t.integer  "score"
    t.integer  "answer_count"
    t.integer  "number_of_tags"
  end

  add_index "questions", ["author_id"], name: "index_questions_on_author_id", using: :btree
  add_index "questions", ["score"], name: "index_questions_on_score", using: :btree
  add_index "questions", ["title"], name: "index_questions_on_title", unique: true, using: :btree

  create_table "tags", force: true do |t|
    t.string   "name",                null: false
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "number_of_questions"
    t.integer  "number_of_users"
  end

  add_index "tags", ["name"], name: "index_tags_on_name", unique: true, using: :btree
  add_index "tags", ["number_of_questions"], name: "index_tags_on_number_of_questions", using: :btree
  add_index "tags", ["number_of_users"], name: "index_tags_on_number_of_users", using: :btree

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "description"
    t.integer  "karma"
    t.boolean  "guest"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["karma"], name: "index_users_on_karma", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  create_table "votes", force: true do |t|
    t.integer  "votable_id",   null: false
    t.string   "votable_type", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "value",        null: false
    t.integer  "user_id"
  end

  add_index "votes", ["user_id", "votable_id", "votable_type"], name: "index_votes_on_user_id_and_votable_id_and_votable_type", unique: true, using: :btree

end
