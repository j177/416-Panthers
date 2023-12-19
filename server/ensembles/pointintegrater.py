import json

# Load the JSON files
with open('PA_250.json', 'r') as file:
    first_json = json.load(file)

with open('ham_pa_clusters.json', 'r') as file:
    second_json = json.load(file)

# Iterate through the first JSON and update the "mds" field
for entry in first_json:
    plan_id = entry.get("planId")
    matching_entry = next((item for item in second_json if item["id"] == plan_id), None)

    if matching_entry:
        mds = entry.get("mds", {})
        point = matching_entry.get("point", {})

        # Round x and y to the nearest hundredth
        mds["x"] = round(point.get("x", 0), 3)
        mds["y"] = round(point.get("y", 0), 3)

# Save the updated first JSON
with open('updated_first.json', 'w') as file:
    json.dump(first_json, file, indent=2)
