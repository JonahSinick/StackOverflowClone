content = File.read("cupcake_ipsum.txt")
array_content = content.split("\n")

User.all.each do |u|
  description = array_content.sample
  u.update_attributes(description: description)
  u.save
end