json.body @message.body
json.image @message.image.url
json.group_id @message.group.id
json.user_id @message.user.id
json.user_name @message.user.name
json.created_at @message.created_at.strftime("%Y-%m-%d %H:%M:%S")
json.id @message.id
