import json

# Specify the path to your JSON file
json_file_path = 'MI_plan7.json'

# Read the JSON file
with open(json_file_path, 'r') as file:
    data = json.load(file)

# Access the "adjacency" field and print its value
if 'adjacency' in data:
    adjacency_array = data['adjacency']

    # Print the first 10 values of the array with a line break between each
    print("First 10 values of 'adjacency':")
    for i in range(min(11, len(adjacency_array))):
        print(i)
        print("============================================================")
        print(adjacency_array[i])
        print("============================================================")
else:
    print("'adjacency' field not found in the JSON file.")