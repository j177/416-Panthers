import json
from collections import defaultdict

# Load the JSON files
with open('MI_250.json', 'r') as file:
    first_json = json.load(file)

with open('ham_mi_clusters.json', 'r') as file:
    second_json = json.load(file)

# Create a dictionary to store cluster information
cluster_info = defaultdict(list)

# Iterate through the second JSON to populate the cluster_info dictionary
for entry in second_json:
    cluster_id = entry.get("cluster")
    cluster_info[cluster_id].append({
        "id": entry.get("id"),
        "point": entry.get("point", {}),
    })

# Create a new list for the output JSON
output_json = []

# Iterate through the first JSON to create the desired structure
for entry in first_json:
    plan_id = entry.get("planId")
    cluster_id = None

    # Find the corresponding cluster information
    for cluster, cluster_entries in cluster_info.items():
        for cluster_entry in cluster_entries:
            if cluster_entry["id"] == plan_id:
                cluster_id = cluster
                break

    if cluster_id is not None:
        # Create the structure for each rdSplit
        rd_splits = []
        rd_split_info = {
            "rDistricts": entry.get("rDistricts"),
            "dDistricts": entry.get("dDistricts"),
            "quantity": 1,
        }
        rd_splits.append(rd_split_info)

        # Check if the cluster already exists in the output JSON
        existing_cluster = next((item for item in output_json if item["id"] == cluster_id), None)

        if existing_cluster:
            # Check if the rdSplit already exists for the cluster
            existing_rd_split = next((item for item in existing_cluster["rdSplits"] if
                                       item["rDistricts"] == rd_split_info["rDistricts"] and
                                       item["dDistricts"] == rd_split_info["dDistricts"]), None)

            if existing_rd_split:
                # If the rdSplit exists, increment the quantity
                existing_rd_split["quantity"] += 1
            else:
                # If the rdSplit does not exist, add it to the cluster
                existing_cluster["rdSplits"].extend(rd_splits)
        else:
            # If the cluster does not exist, create a new cluster entry
            new_cluster_entry = {
                "id": cluster_id,
                "rdSplits": rd_splits,
            }
            output_json.append(new_cluster_entry)

# Save the output JSON to a new file
with open('output.json', 'w') as file:
    json.dump(output_json, file, indent=2)
