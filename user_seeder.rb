content = File.read("lorum_ipsum.txt")
array_content = content.split("\n")

User.all.each do |u|
  description = []
  until description.length > 0
    description = array_content.sample
  end
  
  u.update_attributes(description: description)
  u.save
end