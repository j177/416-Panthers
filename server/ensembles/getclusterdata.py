import json

# Load the JSON file
with open('mi_250_ensemble.json', 'r') as file:
    data = json.load(file)

# Initialize counters for total votes and population
total_dem = 0
total_rep = 0
total_hispanic = 0
total_white = 0
total_black = 0
total_native = 0
total_asian = 0
total_pacific = 0
total_other = 0
total_two_more = 0
total_population = 0

# Iterate through the plans with key "0"
for entry in data.get("plans", {}).get("0", []):
    total_dem += entry.get("dem", 0)
    total_rep += entry.get("rep", 0)
    total_hispanic += entry.get("hispanic", 0)
    total_white += entry.get("white", 0)
    total_black += entry.get("black", 0)
    total_native += entry.get("native", 0)
    total_asian += entry.get("asian", 0)
    total_pacific += entry.get("pacific", 0)
    total_other += entry.get("other", 0)
    total_two_more += entry.get("two_more", 0)
    total_population += entry.get("pop", 0)

# Calculate the percentages
political_pop = total_dem + total_rep
dem_percentage = (total_dem / political_pop) * 100
rep_percentage = (total_rep / political_pop) * 100
hispanic_percentage = (total_hispanic / total_population) * 100
white_percentage = (total_white / total_population) * 100
black_percentage = (total_black / total_population) * 100
native_percentage = (total_native / total_population) * 100
asian_percentage = (total_asian / total_population) * 100
pacific_percentage = (total_pacific / total_population) * 100
other_percentage = (total_other / total_population) * 100
two_more_percentage = (total_two_more / total_population) * 100

# Print the results
print(f"Total Democratic votes: {total_dem}")
print(f"Total Republican votes: {total_rep}")
print(f"Democratic Percentage: {dem_percentage:.2f}%")
print(f"Republican Percentage: {rep_percentage:.2f}%")
print(f"Hispanic Percentage: {hispanic_percentage:.2f}%")
print(f"White Percentage: {white_percentage:.2f}%")
print(f"Black Percentage: {black_percentage:.2f}%")
print(f"Native Percentage: {native_percentage:.2f}%")
print(f"Asian Percentage: {asian_percentage:.2f}%")
print(f"Pacific Percentage: {pacific_percentage:.2f}%")
print(f"Other Percentage: {other_percentage:.2f}%")
print(f"Two More Percentage: {two_more_percentage:.2f}%")
