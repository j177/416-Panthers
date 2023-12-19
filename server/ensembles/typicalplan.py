import os
import json
from shapely.geometry import shape, MultiPolygon
from shapely.ops import unary_union

def calculate_typical_boundary_for_directory(directory_path):
    all_geometries = []

    # Iterate through all files in the directory
    for filename in os.listdir(directory_path):
        if filename.endswith(".json"):
            file_path = os.path.join(directory_path, filename)
            with open(file_path, 'r') as f:
                data = json.load(f)

            # Extract geometries from each file
            geometries = [shape(geometry['geometry']) for geometry in data['geometries']]
            all_geometries.extend(geometries)

    # Combine all geometries into a single MultiPolygon
    multi_polygon = MultiPolygon(all_geometries)

    # Use unary_union to merge overlapping polygons
    merged_geometry = unary_union(multi_polygon)

    return merged_geometry

def save_typical_boundary_to_geojson(directory_path, output_geojson_file):
    typical_boundary = calculate_typical_boundary_for_directory(directory_path)

    # Create a new GeoJSON feature for the typical boundary
    typical_boundary_feature = {
        'type': 'Feature',
        'geometry': typical_boundary.__geo_interface__,
        'properties': {'name': 'Typical Boundary'}
    }

    # Create a new GeoJSON file with the typical boundary feature
    output_data = {
        'type': 'FeatureCollection',
        'features': [typical_boundary_feature]
    }

    with open(output_geojson_file, 'w') as out_file:
        json.dump(output_data, out_file, indent=2)

# Example usage
input_directory = 'DBPlansSimplifiedIdAttached'
output_geojson_file_path = 'output.json'

save_typical_boundary_to_geojson(input_directory, output_geojson_file_path)
