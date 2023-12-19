import json

# Percentage values
percentage_data = {
    "republican": 48.57,
    "democrat": 51.43,
    "white": 72.38,
    "black": 13.50,
    "hispanic": 5.60,
    "asian": 3.30,
    "native": 0.47,
    "pacific": 0.03,
    "other": 0.37,
    "mixed": 4.36
}

# Load the existing JSON file
with open('MI_w_splits.json', 'r') as file:
    existing_data = json.load(file)

# Add percentage fields to each object in the array
for entry in existing_data:
    entry.update(percentage_data)

# Save the updated JSON file
with open('your_updated_file.json', 'w') as file:
    json.dump(existing_data, file, indent=2)

print("Percentage fields added successfully!")
