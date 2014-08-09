content = File.read("french.txt")
array_content = content.split("\n")

(0..99).each do |i|
  u = User.new
  u.username = Faker::Name.name
  u.email = Faker::Internet.email
  u.password = Faker::Internet.password
  u.session_token = SecureRandom.base64
  u.description = array_content.sample
  u.save
end