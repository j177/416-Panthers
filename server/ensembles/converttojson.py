import json

# Read the array of arrays from the input file
input_file_path = 'ham_dist_matrix_mi_250_FINAL.json'
with open(input_file_path, 'r') as input_file:
    array_of_arrays = json.load(input_file)

json_object = {"_id": "hammingDistanceMichigan", "data": array_of_arrays}

# Convert the dictionary to a JSON string
json_string = json.dumps(json_object, indent=2)  # Use indent for pretty formatting

# Save the JSON string to an output file
output_file_path = 'ham_dist_matrix_mi_250_FINAL_json.json'
with open(output_file_path, 'w') as output_file:
    output_file.write(json_string)

print(f"JSON object has been saved to {output_file_path}")
