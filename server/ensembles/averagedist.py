import json

# Function to calculate the sum above the diagonal and count of elements
def calculate_sum_and_count(list, index):
    total_sum = 0
    count = 0

    for i in range(index, len(list)-1):
        total_sum += list[i+1]
        count += 1

    return total_sum, count

# Read the data from the JSON file
file_path = 'ham_dist_matrix_mi_250_FINAL.json'
try:
    with open(file_path, 'r') as file:
        data = json.load(file)
except (ValueError, json.JSONDecodeError) as e:
    print(f"Error reading data: {e}")
    data = []

# Calculate the sum and count for each inner list
result_list = [calculate_sum_and_count(inner_list, index) for index, inner_list in enumerate(data)]

total_sum_all = 0
total_count_all = 0

for pair in result_list:
    total_sum, count = pair
    total_sum_all += total_sum
    total_count_all += count

# Calculate the overall average
if total_count_all > 0:
    overall_average = total_sum_all / total_count_all
    print(f"Overall Result: {total_sum_all}/{total_count_all} = {overall_average}")