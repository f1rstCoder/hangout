import json
import random
from datetime import datetime, timedelta

def generate_random_time(chat_date):
    chat_datetime = datetime.strptime(chat_date, '%Y-%m-%dT%H:%M:%SZ')
    max_time_diff = timedelta(days=7)  # Maximum time difference of 7 days from chat_date
    random_time = chat_datetime + timedelta(seconds=random.randint(1, int(max_time_diff.total_seconds())))
    return random_time.strftime('%Y-%m-%dT%H:%M:%SZ')

# Load myMessages.json
with open('myMessages.json', 'r') as messages_file:
    messages_data = json.load(messages_file)

# Process and update the data
users = messages_data.get('users', [])
for user in users:
    direct_messages = user.get('direct_messages', [])
    for message in direct_messages:
        chats = message.get('chats', [])
        for chat in chats:
            chat_date_str = chat.get('chat_date', '')
            if chat_date_str:
                seen_time = generate_random_time(chat_date_str)
                chat['seen'] = False
                chat['seen-time'] = seen_time

# Write the updated data back to updatedMessages.json
with open('updatedMessages.json', 'w') as output_file:
    json.dump(messages_data, output_file, indent=2)

print("Updated myMessages.json and stored as updatedMessages.json successfully.")
