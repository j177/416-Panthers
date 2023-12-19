import json

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

input_json_file_path = "DBPlans/MI_plan0_geometry.json"
with open(input_json_file_path, 'r') as json_file:
    json_data = json.load(json_file)

geometry_data = json_data.get("geometry")
features_list = extract_coordinates_and_create_feature(geometry_data)
object_id = "mi_0"

# Create GeoJSON
geojson_data = create_geojson(features_list, object_id)

# Specify the output file path
output_file_path = "output.json"  # Replace with your desired output file path

# Write GeoJSON to file
write_geojson_to_file(geojson_data, output_file_path)