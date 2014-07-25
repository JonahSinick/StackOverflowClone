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

ActiveRecord::Schema.define(version: 20140725204858) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: true do |t|
    t.text     "body",        null: false
    t.integer  "author_id",   null: false
    t.integer  "question_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "author_name", null: false
  end

  add_index "answers", ["author_id", "question_id"], name: "index_answers_on_author_id_and_question_id", unique: true, using: :btree
  add_index "answers", ["author_id"], name: "index_answers_on_author_id", using: :btree
  add_index "answers", ["question_id"], name: "index_answers_on_question_id", using: :btree

  create_table "comments", force: true do |t|
    t.text     "body",             null: false
    t.integer  "author_id",        null: false
    t.string   "author_name",      null: false
    t.integer  "commentable_id",   null: false
    t.string   "commentable_type", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["author_id"], name: "index_comments_on_author_id", using: :btree

  create_table "questions", force: true do |t|
    t.string   "title",       null: false
    t.text     "body",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "author_id",   null: false
    t.string   "author_name", null: false
  end

  add_index "questions", ["author_id"], name: "index_questions_on_author_id", using: :btree
  add_index "questions", ["title"], name: "index_questions_on_title", unique: true, using: :btree

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "description"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  create_table "votes", force: true do |t|
    t.integer  "voter_id",     null: false
    t.integer  "votable_id",   null: false
    t.string   "votable_type", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "value",        null: false
  end

  add_index "votes", ["voter_id", "votable_type", "votable_id"], name: "index_votes_on_voter_id_and_votable_type_and_votable_id", unique: true, using: :btree

end
