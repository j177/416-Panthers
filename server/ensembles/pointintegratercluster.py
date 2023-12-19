import json

# Load the JSON file with "point" field
with open('ham_mi_cluster_coords.json', 'r') as file:
    point_data = json.load(file)

# Load the JSON file with the format you provided
with open('MI_Clusters_250.json', 'r') as file:
    rd_splits_data = json.load(file)

# Iterate through the rdSplits data and insert the "point" field
for cluster_entry in rd_splits_data:
    cluster_id = cluster_entry['id']
    point_entry = next((p for p in point_data if p['id'] == cluster_id), None)
    
    if point_entry:
        # Rename "point" to "mds"
        point_entry['mds'] = point_entry.pop('point')
        cluster_entry.update(point_entry)

# Save the updated rdSplits data with "mds" field
with open('output.json', 'w') as file:
    json.dump(rd_splits_data, file, indent=2)

print("Point field inserted and renamed successfully!")
