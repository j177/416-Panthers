import json
import os

def add_id_field(input_file, output_file, counter):
    with open(input_file, 'r') as infile:
        # Load JSON data from file
        data = json.load(infile)

        # Add "_id" field based on the counter
        data['_id'] = f"mi_{counter}"
        data = {'_id': f"mi_{counter}", **data}

    with open(output_file, 'w') as outfile:
        # Write the updated JSON data back to the file
        json.dump(data, outfile, indent=2)

def process_directory(input_dir, output_dir):
    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Process each file in the input directory
    counter = 0
    for filename in os.listdir(input_dir):
        if filename.endswith('.json'):
            input_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, filename)
            add_id_field(input_path, output_path, counter)
            counter += 1

# Example usage
input_directory = 'DBPlansSimplifiedMI'
output_directory = 'DBPlansSimplifiedFormattedMI'
process_directory(input_directory, output_directory)
