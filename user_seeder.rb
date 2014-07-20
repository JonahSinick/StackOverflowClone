
user_ids = (1..100).to_a
(user_ids).each do |i|
  u = User.new
  u.email = Faker::Internet.safe_email
  u.username = Faker::Internet.user_name
  u.password_digest = BCrypt::Password.create(Faker::Internet.password)
  u.session_token = SecureRandom.base64
  u.save!
end