if @new_message.present?
	json.array! @new_message do |message|
		json.body  message.body
		json.image  message.image.url
		json.user_id  message.user.id
		json.user_name message.user.name
		json.created_at message.created_at
		json.id message.id
	end
end
