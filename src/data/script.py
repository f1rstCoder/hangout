import json

# Load myMessages.json
with open('messages.json', 'r') as messages_file:
    messages_data = json.load(messages_file)

# Process and update the data
users = messages_data.get('users', [])
for user in users:
    direct_messages = user.get('direct_messages', [])
    for message in direct_messages:
        unread_msgs = sum(1 for chat in message.get('chats', []) if not chat.get('seen', False))
        message['unreadMsgs'] = unread_msgs

# Write the updated data to myOutput.json
with open('myOutput.json', 'w') as output_file:
    json.dump(messages_data, output_file, indent=2)

print("Updated myMessages.json and stored as myOutput.json successfully.")
