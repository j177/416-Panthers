import json

# Load the second JSON file
with open('ham_mi_clusters.json', 'r') as file:
    data2 = json.load(file)

# Create a dictionary to map ids to clusters
dp_ids = {item["id"]: item["cluster"] for item in data2}

# Read original JSON data from a file
input_file_path = "output.json"
with open(input_file_path, 'r') as input_file:
    original_data = json.load(input_file)

# Add dpIds field to each object
for entry in original_data:
    entry_id = entry["id"]
    entry["dpIds"] = [key for key, value in dp_ids.items() if value == entry_id]

# Save the modified data to a new file
output_file_path = "output2.json"
with open(output_file_path, 'w') as output_file:
    json.dump(original_data, output_file, indent=2)

print(f"JSON data with 'dpIds' field added saved to {output_file_path}")
