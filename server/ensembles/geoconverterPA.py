import json
import os
import re

def create_geojson(features, _id):
    geojson_data = {
        "_id": _id,
        "type": "FeatureCollection",
        "features": features
    }

    return geojson_data

def extract_coordinates_and_create_feature(geometry_data):
    features_list = []
    for key, coordinates_data in geometry_data.items():
        if "coordinates" in coordinates_data:
            feature = {
                "type": "Feature",
                "geometry": {
                    "type": coordinates_data["type"],
                    "coordinates": coordinates_data["coordinates"]
                }
            }
            features_list.append(feature)
    return features_list

def write_geojson_to_file(geojson_data, output_file):
    with open(output_file, 'w') as f:
        json.dump(geojson_data, f, indent=2)

input_directory = "DBPlansPA"
output_directory = "DBPlansPAFormatted"

# Sort filenames to ensure they are processed in order
file_list = sorted(os.listdir(input_directory), key=lambda x: int(re.search(r'\d+', x).group()))

for index, filename in enumerate(file_list):
    if filename.endswith(".json"):
        # Construct full paths for input and output files
        input_file_path = os.path.join(input_directory, filename)
        output_file_path = os.path.join(output_directory, f"output_{index}.json")

        # Load the entire JSON file
        with open(input_file_path, 'r') as json_file:
            json_data = json.load(json_file)

        # Extract coordinates and create features
        geometry_data = json_data.get("geometry")
        features_list = extract_coordinates_and_create_feature(geometry_data)

        # Create a GeoJSON object with all the features
        geojson_data = create_geojson(features_list, f"pa_{index}")

        # Write GeoJSON to file
        write_geojson_to_file(geojson_data, output_file_path)

        print(input_file_path)
        print(f"GeoJSON with separate features has been written to {output_file_path}.")
