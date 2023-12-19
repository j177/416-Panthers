import json

# Load the JSON file with point data
with open('ham_mi_clusters.json', 'r') as file:
    point_data = json.load(file)

# Load the JSON file with district data
with open('MI_250.json', 'r') as file:
    district_data = json.load(file)

# Create a dictionary to store cumulative values for each cluster
cluster_data = {}

# Iterate through the district data and accumulate values for each cluster
for district_entry in district_data:
    point_entry = next((p for p in point_data if p['id'] == district_entry['_id']), None)
    if point_entry:
        cluster_id = point_entry['cluster']
        
        # Initialize the cluster entry if not present
        if cluster_id not in cluster_data:
            cluster_data[cluster_id] = {
                'blackDistricts': 0,
                'hispDistricts': 0,
                'asianDistricts': 0,
                'count': 0,
            }
        
        # Accumulate values
        cluster_data[cluster_id]['blackDistricts'] += district_entry['blackDistricts']
        cluster_data[cluster_id]['hispDistricts'] += district_entry['hispDistricts']
        cluster_data[cluster_id]['asianDistricts'] += district_entry['asianDistricts']
        cluster_data[cluster_id]['count'] += 1

# Calculate averages for each cluster
for cluster_id, values in cluster_data.items():
    count = values['count']
    if count > 0:
        values['blackDistricts'] = round(values['blackDistricts'] / count, 2)
        values['hispDistricts'] = round(values['hispDistricts'] / count, 2)
        values['asianDistricts'] = round(values['asianDistricts'] / count, 2)

# Load the JSON file with rdSplits and averages
with open('your_updated_file.json', 'r') as file:
    rd_splits_data = json.load(file)

# Update the rdSplits data with the calculated averages
for cluster_entry in rd_splits_data:
    cluster_id = cluster_entry['id']
    if cluster_id in cluster_data:
        cluster_entry.update(cluster_data[cluster_id])

# Save the updated rdSplits data to a new JSON file
with open('your_updated_file2.json', 'w') as file:
    json.dump(rd_splits_data, file, indent=2)

print("Averages appended to rdSplits data successfully!")
