import json
import random

json_file_path = 'mi_250_ensemble.json'
output_file_path = 'MI_output.json'

# Read the JSON file
with open(json_file_path, 'r') as file:
    data = json.load(file)

results = []

for plan_id_str, plan in data.get('plans', {}).items():
    plan_id = int(plan_id_str)
    increment = 0
    d_districts = 0
    r_districts = 0
    black_od = 0
    hisp_od = 0
    black_d = 0
    hisp_d = 0
    asian_d = 0
    x = round(random.uniform(-6, 6), 2)
    y = round(random.uniform(-4, 4), 2)

    # Iterate over the objects in the array for each plan
    for district in plan:
        # Check if there is a majority in "dem" or "rep" field
        if district['dem'] > district['rep']:
            d_districts += 1
        elif district['rep'] > district['dem']:
            r_districts += 1

        half_pop = 0.5 * district['vap_pop']
        if district['black_vap'] > half_pop:
            black_od += 1
        if district['hisp_vap'] > half_pop:
            hisp_od += 1

        half_general_pop = 0.1 * district['pop']
        if district['black'] > half_general_pop:
            black_d += 1
        if district['hispanic'] > half_general_pop:
            hisp_d += 1
        if district['asian'] > half_general_pop:
            asian_d += 1

    # Append the results for the current plan to the list
    results.append({
        "_id": "mi_" + str(plan_id+increment),
        "rDistricts": r_districts,
        "dDistricts": d_districts,
        "blackOppDistricts": black_od,
        "hispOppDistricts": hisp_od,
        "blackDistricts": black_d,
        "hispDistricts": hisp_d,
        "asianDistricts": asian_d,
        "mds": {
            "x": x,
            "y": y
        },
        "planId": "mi_" + str(plan_id+increment)
    })

    with open(output_file_path, 'w') as output_file:
        json.dump(results, output_file, indent=2)
else:
    print("'adjacency' field not found in the JSON file.")