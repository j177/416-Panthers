import os
import json
from pymongo import MongoClient

# MongoDB connection settings
mongo_uri = "mongodb://localhost:27017/Panthers"
client = MongoClient(mongo_uri)

# Specify your collection name
collection_name = "plan"

# Switch to your database
db = client.Panthers

def insert_documents(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
        if isinstance(data, list):
            db[collection_name].insert_many(data)
        elif isinstance(data, dict):
            db[collection_name].insert_one(data)

# Directory containing JSON files
json_directory = "DBPlansSimplifiedFormattedPA"

# Insert documents for each JSON file in the directory
for filename in os.listdir(json_directory):
    if filename.endswith(".json"):
        file_path = os.path.join(json_directory, filename)
        insert_documents(file_path)

# Close the MongoDB connection
client.close()
